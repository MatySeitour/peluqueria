import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { listEvents } from "../_lib/googleCalendar";
import { normalizeEventsByDate } from "../_lib/normalizeEvents";
import { resolveProducts } from "../_lib/resolveProducts";
import { BUSINESS_HOURS, EMPLOYEES, SLOT_GRANULARITY_MINUTES } from "../../src/config/staff";
import {
  anyEmployeeCoversAllSkills,
  computeMonthAvailability,
  computeSequentialMonthAvailability,
  datesInMonth,
  isEmployeeQualified,
  monthRange,
  nowInTimezone,
} from "../../src/lib/availability";

const querySchema = z.object({
  year: z.coerce.number().int().min(2020).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  productIds: z
    .string()
    .min(1)
    .transform((value) => value.split(",")),
  employeeId: z.string().min(1).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    return;
  }

  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    return;
  }
  const { year, month, productIds, employeeId } = parsed.data;

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

  const dates = datesInMonth(year, month);
  const { timeMin, timeMax } = monthRange(year, month);

  let rawEvents;
  try {
    rawEvents = await listEvents(timeMin, timeMax);
  } catch (error) {
    console.error("Error consultando Google Calendar", error);
    res.status(502).json({ error: "CALENDAR_UNAVAILABLE" });
    return;
  }

  const eventsByDate = normalizeEventsByDate(rawEvents, dates);
  const needsCombinedBooking =
    !employeeId && resolved.requiredSkills.length > 1 && !anyEmployeeCoversAllSkills(employees, resolved.requiredSkills);

  const days = needsCombinedBooking
    ? computeSequentialMonthAvailability(
        eventsByDate,
        resolved.legs,
        dates,
        BUSINESS_HOURS,
        employees,
        SLOT_GRANULARITY_MINUTES,
        nowInTimezone(),
      )
    : computeMonthAvailability(
        eventsByDate,
        resolved.requiredSkills,
        dates,
        BUSINESS_HOURS,
        {
          employees,
          durationMinutes: resolved.durationMinutes,
          granularityMinutes: SLOT_GRANULARITY_MINUTES,
        },
        nowInTimezone(),
      );

  res.status(200).json({ days });
}
