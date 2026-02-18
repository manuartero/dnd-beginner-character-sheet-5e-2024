import { computeModifier } from "./abilities";
import type { CharacterClass } from "./classes";
import { CLASS_DETAILS } from "./classes";

export function computeHpMax({
  characterClass,
  conScore,
}: {
  characterClass: CharacterClass;
  conScore: number;
}): number {
  const hitDie = CLASS_DETAILS[characterClass].hitDie;
  const hitDieMax = Number.parseInt(hitDie.replace("d", ""), 10);
  return Math.max(1, hitDieMax + computeModifier(conScore));
}
