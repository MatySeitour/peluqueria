import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { insertEvent, listEvents } from "./_lib/googleCalendar";
import { normalizeEventsForDate } from "./_lib/normalizeEvents";
import { resolveProducts } from "./_lib/resolveProducts";
import { BUSINESS_HOURS, EMPLOYEES, TIMEZONE } from "../src/config/staff";
import {
  buildLocalDateTime,
  computeSlotAvailability,
  getQualifiedEmployees,
  localDayRange,
  nowInTimezone,
  pickEmployeeForBooking,
  timeToMinutes,
  weekdayOf,
} from "../src/lib/availability";

const bodySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  productIds: z.array(z.string()).min(1).max(10),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
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
  const { date, time, productIds, name, phone } = parsed.data;

  const resolved = resolveProducts(productIds);
  if (!resolved) {
    res.status(400).json({ error: "INVALID_PRODUCT" });
    return;
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
  const qualifiedEmployees = getQualifiedEmployees(EMPLOYEES, resolved.requiredSkills);
  const availability = computeSlotAvailability(slot, qualifiedEmployees, events);

  if (!availability.available) {
    res.status(409).json({
      error: "SLOT_TAKEN",
      message: "Este horario ya no está disponible, elegí otro.",
    });
    return;
  }

  const employee = pickEmployeeForBooking(availability.freeEmployeeIds, EMPLOYEES);
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
        `Empleada asignada: ${employee.name}`,
        "Reservado desde la web.",
      ].join("\n"),
      startDateTime: buildLocalDateTime(date, slot.startMinutes),
      endDateTime: buildLocalDateTime(date, slot.endMinutes),
      timeZone: TIMEZONE,
      extendedProperties: { employeeId: employee.id, productIds: productIds.join(","), phone },
    });

    res.status(201).json({
      id: event.id,
      employeeName: employee.name,
      date,
      time,
      products: resolved.names,
    });
  } catch (error) {
    console.error("Error creando el evento en Google Calendar", error);
    res.status(502).json({ error: "CALENDAR_UNAVAILABLE" });
  }
}
