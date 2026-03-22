import type { AbilityName } from "src/models/common/abilities";

export function totalBonuses(
  bonuses: Partial<Record<AbilityName, number>>,
): number {
  return Object.values(bonuses).reduce<number>((sum, v) => sum + (v ?? 0), 0);
}
