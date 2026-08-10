import { describe, expect, it } from "vitest";
import type { Employee } from "../config/staff";
import {
  computeDayAvailability,
  computeMonthAvailability,
  computeSlotAvailability,
  generateDaySlots,
  getQualifiedEmployees,
  isEmployeeFreeForSlot,
  parseGoogleEvent,
  pickEmployeeForBooking,
  weekdayOf,
  type NormalizedEvent,
} from "./availability";

const EMPLOYEES: Employee[] = [
  { id: "ana", name: "Ana", skills: ["peluqueria"] },
  { id: "bea", name: "Bea", skills: ["peluqueria", "unas"] },
  { id: "cami", name: "Cami", skills: ["unas"] },
];

describe("generateDaySlots", () => {
  it("no genera un slot cuya duración pase el horario de cierre", () => {
    const slots = generateDaySlots({ open: "09:00", close: "10:00" }, 60, 30);
    expect(slots).toEqual([{ startMinutes: 540, endMinutes: 600 }]);
  });

  it("genera slots cada `granularity` minutos dentro del horario", () => {
    const slots = generateDaySlots({ open: "09:00", close: "10:30" }, 30, 30);
    expect(slots.map((s) => s.startMinutes)).toEqual([540, 570, 600]);
  });
});

describe("isEmployeeFreeForSlot / computeSlotAvailability", () => {
  const slot = { startMinutes: 600, endMinutes: 660 }; // 10:00-11:00

  it("bloquea el slot solo cuando TODAS las empleadas calificadas están ocupadas", () => {
    const events: NormalizedEvent[] = [
      { startMinutes: 600, endMinutes: 660, employeeId: "ana", blocksAllDay: false },
    ];
    const qualified = getQualifiedEmployees(EMPLOYEES, ["peluqueria"]); // ana, bea
    const result = computeSlotAvailability(slot, qualified, events);
    expect(result.available).toBe(true); // bea sigue libre
    expect(result.freeEmployeeIds).toEqual(["bea"]);
  });

  it("marca el slot como no disponible cuando todas las calificadas están ocupadas", () => {
    const events: NormalizedEvent[] = [
      { startMinutes: 600, endMinutes: 660, employeeId: "ana", blocksAllDay: false },
      { startMinutes: 600, endMinutes: 660, employeeId: "bea", blocksAllDay: false },
    ];
    const qualified = getQualifiedEmployees(EMPLOYEES, ["peluqueria"]);
    const result = computeSlotAvailability(slot, qualified, events);
    expect(result.available).toBe(false);
    expect(result.freeEmployeeIds).toEqual([]);
  });

  it("un evento sin employeeId bloquea a todas las empleadas (fallback seguro)", () => {
    const events: NormalizedEvent[] = [
      { startMinutes: 600, endMinutes: 660, employeeId: null, blocksAllDay: false },
    ];
    const qualified = getQualifiedEmployees(EMPLOYEES, ["unas"]); // cami, bea
    expect(isEmployeeFreeForSlot("cami", slot, events)).toBe(false);
    expect(isEmployeeFreeForSlot("bea", slot, events)).toBe(false);
    expect(computeSlotAvailability(slot, qualified, events).available).toBe(false);
  });

  it("un evento de todo el día bloquea el día completo sin importar el horario", () => {
    const events: NormalizedEvent[] = [
      { startMinutes: 0, endMinutes: 24 * 60, employeeId: null, blocksAllDay: true },
    ];
    expect(isEmployeeFreeForSlot("ana", slot, events)).toBe(false);
  });

  it("no bloquea si el evento no se solapa con el slot", () => {
    const events: NormalizedEvent[] = [
      { startMinutes: 540, endMinutes: 600, employeeId: "ana", blocksAllDay: false }, // 9-10, slot es 10-11
    ];
    expect(isEmployeeFreeForSlot("ana", slot, events)).toBe(true);
  });
});

describe("getQualifiedEmployees con múltiples habilidades (turno con varios productos)", () => {
  it("solo califica la empleada que tiene TODAS las habilidades pedidas, no la unión", () => {
    // ana: solo peluqueria, bea: peluqueria+unas, cami: solo unas.
    // Un turno que combina un producto de peluqueria con uno de uñas requiere
    // una única empleada que sepa hacer ambas cosas.
    const qualified = getQualifiedEmployees(EMPLOYEES, ["peluqueria", "unas"]);
    expect(qualified.map((e) => e.id)).toEqual(["bea"]);
  });

  it("devuelve [] si nadie tiene la combinación completa de habilidades", () => {
    const qualified = getQualifiedEmployees(EMPLOYEES, ["peluqueria", "unas", "estetica"]);
    expect(qualified).toEqual([]);
  });
});

describe("parseGoogleEvent", () => {
  it("respeta extendedProperties.private.employeeId cuando existe", () => {
    const event = parseGoogleEvent(
      {
        start: { dateTime: "2026-08-10T13:00:00-03:00" },
        end: { dateTime: "2026-08-10T14:00:00-03:00" },
        extendedProperties: { private: { employeeId: "ana" } },
      },
      "2026-08-10",
    );
    expect(event).toEqual({
      startMinutes: 13 * 60,
      endMinutes: 14 * 60,
      employeeId: "ana",
      blocksAllDay: false,
    });
  });

  it("devuelve employeeId null cuando el evento no tiene extendedProperties (cargado a mano)", () => {
    const event = parseGoogleEvent(
      {
        start: { dateTime: "2026-08-10T13:00:00-03:00" },
        end: { dateTime: "2026-08-10T14:00:00-03:00" },
      },
      "2026-08-10",
    );
    expect(event?.employeeId).toBeNull();
  });

  it("marca blocksAllDay para eventos de todo el día que incluyen la fecha pedida", () => {
    const event = parseGoogleEvent(
      { start: { date: "2026-08-10" }, end: { date: "2026-08-11" } },
      "2026-08-10",
    );
    expect(event?.blocksAllDay).toBe(true);
  });

  it("ignora eventos de todo el día que no incluyen la fecha pedida", () => {
    const event = parseGoogleEvent(
      { start: { date: "2026-08-10" }, end: { date: "2026-08-11" } },
      "2026-08-11",
    );
    expect(event).toBeNull();
  });

  it("ignora eventos cancelados", () => {
    const event = parseGoogleEvent(
      {
        status: "cancelled",
        start: { dateTime: "2026-08-10T13:00:00-03:00" },
        end: { dateTime: "2026-08-10T14:00:00-03:00" },
      },
      "2026-08-10",
    );
    expect(event).toBeNull();
  });
});

describe("computeDayAvailability", () => {
  const config = { employees: EMPLOYEES, durationMinutes: 60, granularityMinutes: 30 };

  it("devuelve [] cuando el día está cerrado", () => {
    expect(computeDayAvailability([], ["peluqueria"], null, config)).toEqual([]);
  });

  it("descarta slots anteriores a `nowMinutes` (día de hoy)", () => {
    const slots = computeDayAvailability(
      [],
      ["peluqueria"],
      { open: "09:00", close: "12:00" },
      config,
      600, // 10:00
    );
    expect(slots.every((s) => s.startMinutes >= 600)).toBe(true);
    expect(slots[0].startMinutes).toBe(600);
  });
});

describe("computeMonthAvailability", () => {
  it("marca un día como disponible si al menos un slot tiene alguien libre", () => {
    const config = { employees: EMPLOYEES, durationMinutes: 60, granularityMinutes: 30 };
    const businessHours = {
      0: null,
      1: { open: "09:00", close: "10:00" },
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    } as const;
    // 2026-08-10 es lunes
    const eventsByDate = new Map<string, NormalizedEvent[]>([
      ["2026-08-10", [{ startMinutes: 540, endMinutes: 600, employeeId: "ana", blocksAllDay: false }]],
    ]);
    const result = computeMonthAvailability(
      eventsByDate,
      ["peluqueria"],
      ["2026-08-10"],
      businessHours,
      config,
    );
    expect(result["2026-08-10"]).toBe(true); // bea sigue libre
  });

  it("marca un día cerrado (domingo) como no disponible", () => {
    const config = { employees: EMPLOYEES, durationMinutes: 60, granularityMinutes: 30 };
    const businessHours = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    } as const;
    expect(weekdayOf("2026-08-09")).toBe(0); // domingo
    const result = computeMonthAvailability(
      new Map(),
      ["peluqueria"],
      ["2026-08-09"],
      businessHours,
      config,
    );
    expect(result["2026-08-09"]).toBe(false);
  });
});

describe("pickEmployeeForBooking", () => {
  it("elige determinísticamente a la primera empleada libre según el orden de config", () => {
    const employee = pickEmployeeForBooking(["cami", "bea"], EMPLOYEES);
    expect(employee?.id).toBe("bea");
  });

  it("devuelve null si no hay ninguna libre", () => {
    expect(pickEmployeeForBooking([], EMPLOYEES)).toBeNull();
  });
});
