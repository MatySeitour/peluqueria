import {
  parseGoogleEvent,
  type NormalizedEvent,
  type RawGoogleEvent,
} from "../../src/lib/availability";

export function normalizeEventsForDate(
  rawEvents: RawGoogleEvent[],
  date: string,
): NormalizedEvent[] {
  return rawEvents
    .map((raw) => parseGoogleEvent(raw, date))
    .filter((event): event is NormalizedEvent => event !== null);
}

export function normalizeEventsByDate(
  rawEvents: RawGoogleEvent[],
  dates: string[],
): Map<string, NormalizedEvent[]> {
  const map = new Map<string, NormalizedEvent[]>();
  for (const date of dates) {
    map.set(date, normalizeEventsForDate(rawEvents, date));
  }
  return map;
}
