import { CLASS_DETAILS } from "src/models/class/classes";
import { ARMORS } from "src/models/gear/armor";
import { ABILITY_LIST, computeModifier, formatModifier } from "./abilities";

import type { CharacterClass } from "src/models/class/classes";
import type { Armor } from "src/models/gear/armor";
import type { Equipment } from "src/models/gear/equipment";
import type { AbilityName, AbilityScores } from "./abilities";

// --- Shared types ---

export type StatBreakdownLine = {
  label: string;
  value: string;
};

export type StatResult = {
  total: number;
  lines: StatBreakdownLine[];
};

// --- HP ---

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

// --- AC ---

function findEquippedArmor(equipment: Equipment[]): Armor | null {
  const armorItem = equipment.find(
    (e) => e.type === "armor" && e.equipped !== false,
  );
  if (!armorItem) return null;
  return ARMORS.find((a) => a.name === armorItem.name) ?? null;
}

function hasShield(equipment: Equipment[]): boolean {
  return equipment.some((e) => e.type === "shield" && e.equipped !== false);
}

export function computeArmorClass({
  equipment,
  abilityScores,
}: {
  equipment: Equipment[];
  abilityScores: AbilityScores;
}): StatResult {
  const armor = findEquippedArmor(equipment);
  const shield = hasShield(equipment);
  const dexMod = computeModifier(abilityScores.dex);

  const lines: StatBreakdownLine[] = [];
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

// --- Initiative ---

export function computeInitiative(abilityScores: AbilityScores): StatResult {
  const dexMod = computeModifier(abilityScores.dex);
  return {
    total: dexMod,
    lines: [{ label: "DEX modifier", value: formatModifier(dexMod) }],
  };
}

// --- Spell Attack ---

const SPELLCASTING_ABILITY: Partial<Record<CharacterClass, AbilityName>> = {
  bard: "cha",
  cleric: "wis",
  druid: "wis",
  paladin: "cha",
  ranger: "wis",
  sorcerer: "cha",
  warlock: "cha",
  wizard: "int",
};

export function computeSpellAttack({
  characterClass,
  abilityScores,
  proficiencyBonus,
}: {
  characterClass: CharacterClass;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
}): StatResult | null {
  const spellAbility = SPELLCASTING_ABILITY[characterClass];
  if (!spellAbility) return null;

  const abilityMod = computeModifier(abilityScores[spellAbility]);
  const total = abilityMod + proficiencyBonus;
  const shortLabel =
    ABILITY_LIST.find((a) => a.key === spellAbility)?.short ?? spellAbility;

  return {
    total,
    lines: [
      {
        label: `${shortLabel} modifier`,
        value: formatModifier(abilityMod),
      },
      {
        label: "Proficiency bonus",
        value: formatModifier(proficiencyBonus),
      },
    ],
  };
}
