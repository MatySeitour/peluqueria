// Config compartida entre el frontend (Vite) y las funciones serverless (/api).
// No importar nada de React/DOM/Node acá para que sea usable desde ambos lados.

export type EmployeeSkill = "peluqueria" | "unas" | "estetica";

export const SKILL_LABELS: Record<EmployeeSkill, string> = {
  peluqueria: "Peluquería",
  unas: "Uñas",
  estetica: "Estética",
};

export interface Employee {
  /** Slug estable, se guarda en los eventos de Calendar. No renombrar una vez que haya reservas creadas. */
  id: string;
  name: string;
  skills: EmployeeSkill[];
}

export interface DayHours {
  open: string; // "HH:mm"
  close: string; // "HH:mm"
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

// TODO: reemplazar por el plantel real y quién hace qué.
export const EMPLOYEES: Employee[] = [
  { id: "empleada-1", name: "Empleada 1", skills: ["peluqueria", "unas", "estetica"] },
  { id: "empleada-2", name: "Empleada 2", skills: ["peluqueria"] },
  { id: "empleada-3", name: "Empleada 3", skills: ["peluqueria", "estetica"] },
  { id: "empleada-4", name: "Empleada 4", skills: ["unas"] },
  { id: "empleada-5", name: "Empleada 5", skills: ["peluqueria", "unas"] },
];

export interface Product {
  id: string;
  /** Nombre a mostrar al cliente (coincide con los encabezados de /servicios). */
  name: string;
  /** Habilidad que necesita la empleada para poder hacer este producto. */
  skill: EmployeeSkill;
  /** TODO: reemplazar por el tiempo real que lleva cada servicio. Son estimaciones de arranque. */
  durationMinutes: number;
}

// Un producto por cada encabezado de /servicios (no se baja al detalle de cada
// marca/largo de pelo, que son variantes de precio, no de tiempo de reserva).
export const PRODUCTS: Product[] = [
  // Peluquería
  { id: "lavado", name: "Lavado", skill: "peluqueria", durationMinutes: 20 },
  { id: "nutriciones", name: "Nutriciones", skill: "peluqueria", durationMinutes: 30 },
  { id: "ampollas", name: "Ampollas", skill: "peluqueria", durationMinutes: 20 },
  { id: "tratamientos-capilares", name: "Tratamientos capilares", skill: "peluqueria", durationMinutes: 45 },
  { id: "keratina", name: "Keratina", skill: "peluqueria", durationMinutes: 150 },
  { id: "alisados", name: "Alisados", skill: "peluqueria", durationMinutes: 150 },
  { id: "botox-capilar", name: "Botox capilar", skill: "peluqueria", durationMinutes: 90 },
  { id: "cortes", name: "Cortes", skill: "peluqueria", durationMinutes: 45 },
  { id: "brushing", name: "Brushing", skill: "peluqueria", durationMinutes: 40 },
  { id: "secado-modelado", name: "Secado modelado", skill: "peluqueria", durationMinutes: 30 },
  { id: "ondas", name: "Ondas", skill: "peluqueria", durationMinutes: 45 },
  { id: "peinados", name: "Peinados", skill: "peluqueria", durationMinutes: 60 },
  { id: "coloracion", name: "Coloración", skill: "peluqueria", durationMinutes: 90 },
  { id: "mechas-localizadas", name: "Mechas localizadas", skill: "peluqueria", durationMinutes: 150 },
  { id: "reflejos-con-gorra", name: "Reflejos con gorra", skill: "peluqueria", durationMinutes: 120 },
  { id: "balayage", name: "Balayage", skill: "peluqueria", durationMinutes: 150 },
  { id: "decoloracion", name: "Decoloración", skill: "peluqueria", durationMinutes: 120 },

  // Uñas
  { id: "manos", name: "Manos", skill: "unas", durationMinutes: 45 },
  { id: "pies", name: "Pies", skill: "unas", durationMinutes: 45 },
  { id: "nail-art", name: "Diseño Nail Art", skill: "unas", durationMinutes: 20 },
  { id: "tratamientos-pedicura", name: "Tratamientos pedicura", skill: "unas", durationMinutes: 45 },

  // Estética
  { id: "depilacion-hombre", name: "Depilación hombre", skill: "estetica", durationMinutes: 30 },
  { id: "depilacion-mujer-rostro", name: "Depilación mujer · Rostro", skill: "estetica", durationMinutes: 20 },
  { id: "depilacion-mujer-torso", name: "Depilación mujer · Torso", skill: "estetica", durationMinutes: 30 },
  { id: "depilacion-mujer-piernas", name: "Depilación mujer · Brazos/piernas/pelvis", skill: "estetica", durationMinutes: 40 },
  { id: "cejas", name: "Cejas", skill: "estetica", durationMinutes: 20 },
  { id: "pestanas", name: "Pestañas", skill: "estetica", durationMinutes: 45 },
];
