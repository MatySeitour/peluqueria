// Lógica pura de disponibilidad: sin dependencias de googleapis/React/Node,
// para poder testearla con fixtures planos y reutilizarla desde /api y (si hace falta) el frontend.

import type {
  BusinessHours,
  DayHours,
  Employee,
  EmployeeSkill,
} from "../config/staff";
import { TIMEZONE, TIMEZONE_OFFSET } from "../config/staff";

export interface Slot {
  startMinutes: number;
  endMinutes: number;
}

export interface SlotAvailability extends Slot {
  available: boolean;
  freeEmployeeIds: string[];
}

export interface NormalizedEvent {
  startMinutes: number;
  endMinutes: number;
  /** null = evento sin atribuir a una empleada puntual -> bloquea a todas. */
  employeeId: string | null;
  blocksAllDay: boolean;
}

export interface RawGoogleEvent {
  status?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
  extendedProperties?: { private?: Record<string, string> };
}

export interface AvailabilityConfig {
  employees: Employee[];
  durationMinutes: number;
  granularityMinutes: number;
}

// ---- Helpers de fecha/hora (sin librerías externas) ----

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function weekdayOf(date: string): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function datesInMonth(year: number, month: number): string[] {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const mm = String(month).padStart(2, "0");
  return Array.from({ length: daysInMonth }, (_, i) =>
    `${year}-${mm}-${String(i + 1).padStart(2, "0")}`,
  );
}

/** Rango [timeMin, timeMax) en RFC3339 con offset fijo de Buenos Aires, para un solo día. */
export function localDayRange(date: string): { timeMin: string; timeMax: string } {
  return {
    timeMin: `${date}T00:00:00${TIMEZONE_OFFSET}`,
    timeMax: `${addDays(date, 1)}T00:00:00${TIMEZONE_OFFSET}`,
  };
}

/** Rango [timeMin, timeMax) para todo un mes calendario. */
export function monthRange(year: number, month: number): { timeMin: string; timeMax: string } {
  const dates = datesInMonth(year, month);
  return {
    timeMin: `${dates[0]}T00:00:00${TIMEZONE_OFFSET}`,
    timeMax: `${addDays(dates[dates.length - 1], 1)}T00:00:00${TIMEZONE_OFFSET}`,
  };
}

/** Arma un dateTime RFC3339 en horario de Buenos Aires a partir de fecha + minutos del día. */
export function buildLocalDateTime(date: string, minutes: number): string {
  return `${date}T${minutesToTime(minutes)}:00${TIMEZONE_OFFSET}`;
}

function toLocalParts(iso: string): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));

  const map: Record<string, string> = {};
  for (const part of parts) map[part.type] = part.value;

  return {
    date: `${map.year}-${map.month}-${map.day}`,
    minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10),
  };
}

export function nowInTimezone(): { date: string; minutes: number } {
  return toLocalParts(new Date().toISOString());
}

// ---- Normalización de eventos de Google Calendar ----

export function parseGoogleEvent(
  raw: RawGoogleEvent,
  targetDate: string,
): NormalizedEvent | null {
  if (raw.status === "cancelled" || !raw.start || !raw.end) return null;

  if (raw.start.date) {
    // Evento de todo el día. end.date es exclusivo según la API de Calendar.
    const startDate = raw.start.date;
    const endDate = raw.end.date ?? raw.start.date;
    if (targetDate < startDate || targetDate >= endDate) return null;
    return { startMinutes: 0, endMinutes: 24 * 60, employeeId: null, blocksAllDay: true };
  }

  if (!raw.start.dateTime || !raw.end.dateTime) return null;

  const start = toLocalParts(raw.start.dateTime);
  const end = toLocalParts(raw.end.dateTime);

  if (end.date < targetDate || start.date > targetDate) return null;

  const startMinutes = start.date < targetDate ? 0 : start.minutes;
  const endMinutes = end.date > targetDate ? 24 * 60 : end.minutes;
  if (startMinutes >= endMinutes) return null;

  return {
    startMinutes,
    endMinutes,
    employeeId: raw.extendedProperties?.private?.employeeId ?? null,
    blocksAllDay: false,
  };
}

// ---- Cálculo de disponibilidad ----

export function generateDaySlots(
  hours: DayHours,
  durationMinutes: number,
  granularityMinutes: number,
): Slot[] {
  const open = timeToMinutes(hours.open);
  const close = timeToMinutes(hours.close);
  const slots: Slot[] = [];
  for (let start = open; start + durationMinutes <= close; start += granularityMinutes) {
    slots.push({ startMinutes: start, endMinutes: start + durationMinutes });
  }
  return slots;
}

/**
 * Una empleada califica para un turno solo si tiene TODAS las habilidades
 * requeridas por los productos elegidos (un turno = una sola empleada,
 * aunque el cliente haya combinado productos de distinta habilidad).
 */
export function getQualifiedEmployees(
  employees: Employee[],
  requiredSkills: EmployeeSkill[],
): Employee[] {
  return employees.filter((employee) =>
    requiredSkills.every((skill) => employee.skills.includes(skill)),
  );
}

export function isEmployeeFreeForSlot(
  employeeId: string,
  slot: Slot,
  events: NormalizedEvent[],
): boolean {
  return !events.some((event) => {
    const blocksThisEmployee =
      event.blocksAllDay || event.employeeId === null || event.employeeId === employeeId;
    if (!blocksThisEmployee) return false;
    return slot.startMinutes < event.endMinutes && event.startMinutes < slot.endMinutes;
  });
}

export function computeSlotAvailability(
  slot: Slot,
  qualifiedEmployees: Employee[],
  events: NormalizedEvent[],
): SlotAvailability {
  const freeEmployeeIds = qualifiedEmployees
    .filter((employee) => isEmployeeFreeForSlot(employee.id, slot, events))
    .map((employee) => employee.id);
  return { ...slot, available: freeEmployeeIds.length > 0, freeEmployeeIds };
}

export function computeDayAvailability(
  dayEvents: NormalizedEvent[],
  requiredSkills: EmployeeSkill[],
  hours: DayHours | null,
  config: AvailabilityConfig,
  nowMinutes?: number,
): SlotAvailability[] {
  if (!hours) return [];
  const qualified = getQualifiedEmployees(config.employees, requiredSkills);
  return generateDaySlots(hours, config.durationMinutes, config.granularityMinutes)
    .filter((slot) => nowMinutes === undefined || slot.startMinutes >= nowMinutes)
    .map((slot) => computeSlotAvailability(slot, qualified, dayEvents));
}

export function computeMonthAvailability(
  eventsByDate: Map<string, NormalizedEvent[]>,
  requiredSkills: EmployeeSkill[],
  dates: string[],
  businessHours: BusinessHours,
  config: AvailabilityConfig,
  today?: { date: string; minutes: number },
): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  for (const date of dates) {
    const hours = businessHours[weekdayOf(date)];
    const nowMinutes = today && today.date === date ? today.minutes : undefined;
    const slots = computeDayAvailability(
      eventsByDate.get(date) ?? [],
      requiredSkills,
      hours,
      config,
      nowMinutes,
    );
    result[date] = slots.some((slot) => slot.available);
  }
  return result;
}

export function pickEmployeeForBooking(
  freeEmployeeIds: string[],
  employees: Employee[],
): Employee | null {
  return employees.find((employee) => freeEmployeeIds.includes(employee.id)) ?? null;
}
