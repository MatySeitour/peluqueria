import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { deleteEvent, insertEvent, listEvents } from "./_lib/googleCalendar";
import { normalizeEventsForDate } from "./_lib/normalizeEvents";
import { resolveProducts, type ResolvedProductItem } from "./_lib/resolveProducts";
import { BUSINESS_HOURS, EMPLOYEES, TIMEZONE, type Employee } from "../src/config/staff";
import {
  anyEmployeeCoversAllSkills,
  buildLocalDateTime,
  computeSlotAvailability,
  getQualifiedEmployees,
  isEmployeeFreeForSlot,
  isEmployeeQualified,
  localDayRange,
  nowInTimezone,
  pickEmployeeForBooking,
  timeToMinutes,
  weekdayOf,
  type NormalizedEvent,
} from "../src/lib/availability";

const bodySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  productIds: z.array(z.string()).min(1).max(10),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  notes: z.string().trim().max(500).optional(),
  employeeId: z.string().min(1).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    return;
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    return;
  }
  const { date, time, productIds, name, phone, notes, employeeId } = parsed.data;

  const resolved = resolveProducts(productIds);
  if (!resolved) {
    res.status(400).json({ error: "INVALID_PRODUCT" });
    return;
  }

  let employees = EMPLOYEES;
  if (employeeId) {
    const employee = EMPLOYEES.find((e) => e.id === employeeId);
    if (!employee || !isEmployeeQualified(employee, resolved.requiredSkills)) {
      res.status(400).json({ error: "INVALID_EMPLOYEE" });
      return;
    }
    employees = [employee];
  }

  const hours = BUSINESS_HOURS[weekdayOf(date)];
  if (!hours) {
    res.status(400).json({ error: "DAY_CLOSED" });
    return;
  }

  const slot = {
    startMinutes: timeToMinutes(time),
    endMinutes: timeToMinutes(time) + resolved.durationMinutes,
  };

  if (slot.startMinutes < timeToMinutes(hours.open) || slot.endMinutes > timeToMinutes(hours.close)) {
    res.status(400).json({ error: "SLOT_OUT_OF_HOURS" });
    return;
  }

  const now = nowInTimezone();
  if (date === now.date && slot.startMinutes < now.minutes) {
    res.status(400).json({ error: "SLOT_IN_PAST" });
    return;
  }

  const { timeMin, timeMax } = localDayRange(date);
  let rawEvents;
  try {
    rawEvents = await listEvents(timeMin, timeMax);
  } catch (error) {
    console.error("Error consultando Google Calendar", error);
    res.status(502).json({ error: "CALENDAR_UNAVAILABLE" });
    return;
  }

  // Recalculamos disponibilidad justo antes de insertar (mitigación best-effort de
  // condiciones de carrera: no hay DB/lock, así que dos reservas simultáneas para el
  // último lugar libre podrían ambas pasar este chequeo).
  const events = normalizeEventsForDate(rawEvents, date);
  const weekday = weekdayOf(date);
  const totalPriceFormatted = resolved.totalPrice.toLocaleString("es-AR");

  // Si nadie individualmente cubre todas las habilidades pedidas, el turno se arma
  // combinando empleadas distintas por tramo (mismo criterio que /api/availability).
  const needsCombinedBooking =
    !employeeId && resolved.requiredSkills.length > 1 && !anyEmployeeCoversAllSkills(employees, resolved.requiredSkills);

  if (needsCombinedBooking) {
    await handleCombinedBooking(res, {
      date, time, name, phone, notes, weekday, slot, events, resolved, totalPriceFormatted,
    });
    return;
  }

  const qualifiedEmployees = getQualifiedEmployees(employees, resolved.requiredSkills, weekday);
  const availability = computeSlotAvailability(slot, qualifiedEmployees, events);

  if (!availability.available) {
    res.status(409).json({
      error: "SLOT_TAKEN",
      message: "Este horario ya no está disponible, elegí otro.",
    });
    return;
  }

  const employee = pickEmployeeForBooking(availability.freeEmployeeIds, employees);
  if (!employee) {
    res.status(409).json({ error: "SLOT_TAKEN" });
    return;
  }

  const productsList = resolved.names.join(", ");

  try {
    const event = await insertEvent({
      summary: `${productsList} - ${name}`,
      description: [
        `Cliente: ${name}`,
        `Teléfono: ${phone}`,
        `Servicios: ${productsList}`,
        `Total: $${totalPriceFormatted}`,
        `Empleada asignada: ${employee.name}`,
        ...(notes ? [`Nota del cliente: ${notes}`] : []),
        "Reservado desde la web.",
      ].join("\n"),
      startDateTime: buildLocalDateTime(date, slot.startMinutes),
      endDateTime: buildLocalDateTime(date, slot.endMinutes),
      timeZone: TIMEZONE,
      extendedProperties: { employeeId: employee.id, productIds: productIds.join(","), phone },
      colorId: employee.calendarColorId,
    });

    res.status(201).json({
      ids: [event.id],
      employeeName: employee.name,
      employees: [{ name: employee.name }],
      date,
      time,
      products: resolved.names,
      totalPrice: resolved.totalPrice,
    });
  } catch (error) {
    console.error("Error creando el evento en Google Calendar", error);
    res.status(502).json({ error: "CALENDAR_UNAVAILABLE" });
  }
}

interface CombinedBookingArgs {
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string | undefined;
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  slot: { startMinutes: number; endMinutes: number };
  events: NormalizedEvent[];
  resolved: NonNullable<ReturnType<typeof resolveProducts>>;
  totalPriceFormatted: string;
}

/**
 * Turno combinado: un tramo consecutivo por habilidad (ej. peluquería y después
 * uñas), cada uno con su propia empleada, como un evento de Calendar por tramo
 * ligados por `groupBookingId`.
 */
async function handleCombinedBooking(res: VercelResponse, args: CombinedBookingArgs) {
  const { date, time, name, phone, notes, weekday, slot, events, resolved, totalPriceFormatted } = args;

  const legAssignments: {
    skill: (typeof resolved.legs)[number]["skill"];
    startMinutes: number;
    endMinutes: number;
    employee: Employee;
    items: ResolvedProductItem[];
  }[] = [];

  let cursor = slot.startMinutes;
  for (const leg of resolved.legs) {
    const legSlot = { startMinutes: cursor, endMinutes: cursor + leg.durationMinutes };
    cursor = legSlot.endMinutes;

    const qualified = getQualifiedEmployees(EMPLOYEES, [leg.skill], weekday);
    const freeIds = qualified
      .filter((e) => isEmployeeFreeForSlot(e.id, legSlot, events))
      .map((e) => e.id);
    const employee = pickEmployeeForBooking(freeIds, qualified);
    if (!employee) {
      res.status(409).json({
        error: "SLOT_TAKEN",
        message: "Este horario ya no está disponible, elegí otro.",
      });
      return;
    }

    legAssignments.push({
      skill: leg.skill,
      startMinutes: legSlot.startMinutes,
      endMinutes: legSlot.endMinutes,
      employee,
      items: resolved.items.filter((item) => item.skill === leg.skill),
    });
  }

  const groupBookingId = randomUUID();
  const createdEventIds: string[] = [];

  try {
    for (const assignment of legAssignments) {
      const legProductsList = assignment.items.map((item) => item.name).join(", ");
      const otherEmployees = legAssignments
        .filter((a) => a !== assignment)
        .map((a) => a.employee.name)
        .join(", ");

      const event = await insertEvent({
        summary: `${legProductsList} - ${name}`,
        description: [
          `Cliente: ${name}`,
          `Teléfono: ${phone}`,
          `Servicios de este tramo: ${legProductsList}`,
          `Total de la reserva completa: $${totalPriceFormatted}`,
          `Empleada asignada: ${assignment.employee.name}`,
          `Turno combinado con: ${otherEmployees}`,
          ...(notes ? [`Nota del cliente: ${notes}`] : []),
          "Reservado desde la web.",
        ].join("\n"),
        startDateTime: buildLocalDateTime(date, assignment.startMinutes),
        endDateTime: buildLocalDateTime(date, assignment.endMinutes),
        timeZone: TIMEZONE,
        extendedProperties: {
          employeeId: assignment.employee.id,
          productIds: assignment.items.map((item) => item.id).join(","),
          phone,
          groupBookingId,
        },
        colorId: assignment.employee.calendarColorId,
      });
      createdEventIds.push(event.id);
    }
  } catch (error) {
    console.error("Error creando el turno combinado en Google Calendar", error);
    await Promise.allSettled(createdEventIds.map((id) => deleteEvent(id)));
    res.status(502).json({ error: "CALENDAR_UNAVAILABLE" });
    return;
  }

  res.status(201).json({
    ids: createdEventIds,
    employeeName: legAssignments.map((a) => a.employee.name).join(" y "),
    employees: legAssignments.map((a) => ({ name: a.employee.name })),
    date,
    time,
    products: resolved.names,
    totalPrice: resolved.totalPrice,
  });
}
