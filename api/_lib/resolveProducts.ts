import { PRODUCTS, type EmployeeSkill } from "../../src/config/staff";
import type { Leg } from "../../src/lib/availability";

// Orden fijo en el que se encadenan los tramos de un turno combinado
// (ej. peluquería primero, uñas después) cuando ninguna empleada cubre todas
// las habilidades pedidas a la vez.
const SKILL_ORDER: EmployeeSkill[] = ["peluqueria", "unas", "estetica"];

export interface ResolvedProductItem {
  id: string;
  name: string;
  skill: EmployeeSkill;
  durationMinutes: number;
  price: number;
}

export interface ResolvedProducts {
  ids: string[];
  names: string[];
  durationMinutes: number;
  requiredSkills: EmployeeSkill[];
  totalPrice: number;
  /** Desglose por habilidad en SKILL_ORDER, para armar un turno combinado si hace falta. */
  legs: Leg[];
  items: ResolvedProductItem[];
}

/** Devuelve null si algún id de producto no existe en el catálogo o no es reservable. */
export function resolveProducts(productIds: string[]): ResolvedProducts | null {
  const products = productIds.map((id) => PRODUCTS.find((p) => p.id === id && p.bookable));
  if (products.some((p) => p === undefined) || products.length === 0) return null;
  const found = products as Exclude<(typeof products)[number], undefined>[];

  const legs: Leg[] = SKILL_ORDER.filter((skill) => found.some((p) => p.skill === skill)).map(
    (skill) => ({
      skill,
      durationMinutes: found.filter((p) => p.skill === skill).reduce((sum, p) => sum + p.durationMinutes, 0),
    }),
  );

  return {
    ids: productIds,
    names: found.map((p) => p.name),
    durationMinutes: found.reduce((sum, p) => sum + p.durationMinutes, 0),
    requiredSkills: Array.from(new Set(found.map((p) => p.skill))),
    totalPrice: found.reduce((sum, p) => sum + p.price, 0),
    legs,
    items: found.map((p) => ({
      id: p.id,
      name: p.name,
      skill: p.skill,
      durationMinutes: p.durationMinutes,
      price: p.price,
    })),
  };
}
