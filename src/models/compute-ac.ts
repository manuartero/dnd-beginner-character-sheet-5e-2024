import { computeModifier, formatModifier } from "./abilities";
import { ARMORS } from "./armor";

import type { AbilityScores } from "./abilities";
import type { Armor } from "./armor";
import type { Equipment } from "./equipment";

export type AcBreakdownLine = {
  label: string;
  value: string;
};

export type AcResult = {
  total: number;
  lines: AcBreakdownLine[];
};

function findEquippedArmor(equipment: Equipment[]): Armor | null {
  const armorItem = equipment.find((e) => e.type === "armor");
  if (!armorItem) return null;
  return ARMORS.find((a) => a.name === armorItem.name) ?? null;
}

function hasShield(equipment: Equipment[]): boolean {
  return equipment.some((e) => e.type === "shield");
}

export function computeArmorClass({
  equipment,
  abilityScores,
}: {
  equipment: Equipment[];
  abilityScores: AbilityScores;
}): AcResult {
  const armor = findEquippedArmor(equipment);
  const shield = hasShield(equipment);
  const dexMod = computeModifier(abilityScores.dex);

  const lines: AcBreakdownLine[] = [];
  let total = 0;

  if (armor) {
    total = armor.baseAc;
    lines.push({ label: armor.name, value: `${armor.baseAc}` });

    if (armor.dexModifier) {
      const effectiveDex =
        armor.maxDexModifier !== null
          ? Math.min(dexMod, armor.maxDexModifier)
          : dexMod;
      total += effectiveDex;
      const cap =
        armor.maxDexModifier !== null
          ? ` (max ${formatModifier(armor.maxDexModifier)})`
          : "";
      lines.push({
        label: `DEX modifier${cap}`,
        value: formatModifier(effectiveDex),
      });
    }
  } else {
    total = 10 + dexMod;
    lines.push({ label: "No armor", value: "10" });
    lines.push({ label: "DEX modifier", value: formatModifier(dexMod) });
  }

  if (shield) {
    total += 2;
    lines.push({ label: "Shield", value: "+2" });
  }

  return { total, lines };
}
