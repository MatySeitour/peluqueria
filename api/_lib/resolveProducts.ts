import { PRODUCTS, type EmployeeSkill } from "../../src/config/staff";

export interface ResolvedProducts {
  ids: string[];
  names: string[];
  durationMinutes: number;
  requiredSkills: EmployeeSkill[];
}

/** Devuelve null si algún id de producto no existe en el catálogo. */
export function resolveProducts(productIds: string[]): ResolvedProducts | null {
  const products = productIds.map((id) => PRODUCTS.find((p) => p.id === id));
  if (products.some((p) => p === undefined) || products.length === 0) return null;
  const found = products as Exclude<(typeof products)[number], undefined>[];

  return {
    ids: productIds,
    names: found.map((p) => p.name),
    durationMinutes: found.reduce((sum, p) => sum + p.durationMinutes, 0),
    requiredSkills: Array.from(new Set(found.map((p) => p.skill))),
  };
}
