// Config compartida entre el frontend (Vite) y las funciones serverless (/api).
// No importar nada de React/DOM/Node acá para que sea usable desde ambos lados.

export type { EmployeeSkill, Product, ServiceCategoryDef, ServiceGroup, ServiceVariant } from "./catalog";
export { CATALOG, PRODUCTS, SKILL_LABELS } from "./catalog";
import type { EmployeeSkill } from "./catalog";

export interface Employee {
  /** Slug estable, se guarda en los eventos de Calendar. No renombrar una vez que haya reservas creadas. */
  id: string;
  name: string;
  skills: EmployeeSkill[];
  /** Días que trabaja, 0 = domingo ... 6 = sábado (mismo formato que BusinessHours). */
  workDays: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  /**
   * colorId de Google Calendar para distinguir a cada empleada dentro del mismo
   * calendario compartido (ver https://developers.google.com/calendar/api/v3/reference/colors/get).
   * 1 Lavanda, 2 Salvia, 3 Uva, 4 Flamenco, 5 Banana, 6 Mandarina, 7 Pavo real,
   * 8 Grafito, 9 Arándano, 10 Albahaca, 11 Tomate.
   */
  calendarColorId: string;
}

export interface DayHours {
  open: string; // "09:30"
  close: string; // "19:00"
}

// 0 = domingo ... 6 = sábado (Date.getDay())
export type BusinessHours = Record<0 | 1 | 2 | 3 | 4 | 5 | 6, DayHours | null>;

export const TIMEZONE = "America/Argentina/Buenos_Aires";
// Argentina no tiene horario de verano, el offset es fijo.
export const TIMEZONE_OFFSET = "-03:00";

export const SLOT_GRANULARITY_MINUTES = 30;

// Lunes a sábado 9:30-19:00, domingo cerrado (coincide con lo que ya se muestra en el Nav).
// TODO: si el salón corta al mediodía, modelar acá un segundo bloque horario.
export const BUSINESS_HOURS: BusinessHours = {
  0: null,
  1: { open: "09:30", close: "19:00" },
  2: { open: "09:30", close: "19:00" },
  3: { open: "09:30", close: "19:00" },
  4: { open: "09:30", close: "19:00" },
  5: { open: "09:30", close: "19:00" },
  6: { open: "09:30", close: "19:00" },
};

export const EMPLOYEES: Employee[] = [
  { id: "gloria", name: "Gloria", skills: ["peluqueria"], workDays: [2, 3, 4, 5, 6], calendarColorId: "9" },
  { id: "silvia", name: "Silvia", skills: ["peluqueria"], workDays: [1, 3, 4, 5, 6], calendarColorId: "5" },
  { id: "micaela", name: "Micaela", skills: ["unas", "estetica"], workDays: [2, 3, 4, 5, 6], calendarColorId: "10" },
  { id: "sofia", name: "Sofia", skills: ["unas", "estetica"], workDays: [4, 5, 6], calendarColorId: "6" },
];

