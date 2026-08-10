import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { listEvents } from "../_lib/googleCalendar";
import { normalizeEventsForDate } from "../_lib/normalizeEvents";
import { resolveProducts } from "../_lib/resolveProducts";
import { BUSINESS_HOURS, EMPLOYEES, SLOT_GRANULARITY_MINUTES } from "../../src/config/staff";
import {
  computeDayAvailability,
  localDayRange,
  minutesToTime,
  nowInTimezone,
  weekdayOf,
} from "../../src/lib/availability";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  productIds: z
    .string()
    .min(1)
    .transform((value) => value.split(",")),
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
  const { date, productIds } = parsed.data;

  const resolved = resolveProducts(productIds);
  if (!resolved) {
    res.status(400).json({ error: "INVALID_PRODUCT" });
    return;
  }

  const hours = BUSINESS_HOURS[weekdayOf(date)];
  if (!hours) {
    res.status(200).json({ slots: [] });
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

  const now = nowInTimezone();
  const slots = computeDayAvailability(
    normalizeEventsForDate(rawEvents, date),
    resolved.requiredSkills,
    hours,
    {
      employees: EMPLOYEES,
      durationMinutes: resolved.durationMinutes,
      granularityMinutes: SLOT_GRANULARITY_MINUTES,
    },
    now.date === date ? now.minutes : undefined,
  );

  res.status(200).json({
    slots: slots.map((slot) => ({
      time: minutesToTime(slot.startMinutes),
      available: slot.available,
    })),
  });
}
