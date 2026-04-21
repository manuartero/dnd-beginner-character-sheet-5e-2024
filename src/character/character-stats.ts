import { computeModifier, formatModifier } from "src/character/modifiers";
import { classes } from "src/models/class/classes";
import { abilities } from "src/models/common/abilities";
import { armor } from "src/models/common/gear/armor";

import type { CharacterClass } from "src/models/class/classes";
import type { AbilityName, AbilityScores } from "src/models/common/abilities";
import type { Armor } from "src/models/common/gear/armor";
import type { Equipment } from "src/models/common/gear/equipment";

export type StatBreakdownLine = {
  label: string;
  value: string;
};

export type StatResult = {
  total: number;
  lines: StatBreakdownLine[];
};

export function computeHpMax({
  characterClass,
  conScore,
}: {
  characterClass: CharacterClass;
  conScore: number;
}): number {
  const hitDie = classes.get({ id: characterClass }).hitDie;
  const hitDieMax = Number.parseInt(hitDie.replace("d", ""), 10);
  return Math.max(1, hitDieMax + computeModifier(conScore));
}

function findEquippedArmor(equipment: Equipment[]): Armor | null {
  const armorItem = equipment.find(
    (e) => e.type === "armor" && e.equipped === true,
  );
  if (!armorItem) return null;
  return armor.find({ name: armorItem.name }) ?? null;
}

function hasShield(equipment: Equipment[]): boolean {
  return equipment.some((e) => e.type === "shield" && e.equipped === true);
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

export function computeInitiative(abilityScores: AbilityScores): StatResult {
  const dexMod = computeModifier(abilityScores.dex);
  return {
    total: dexMod,
    lines: [{ label: "DEX modifier", value: formatModifier(dexMod) }],
  };
}

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
  const shortLabel = abilities.get({ id: spellAbility }).short;

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
