import type { AbilityName } from "./abilities";

export type SkillName =
  | "athletics"
  | "acrobatics"
  | "sleight-of-hand"
  | "stealth"
  | "arcana"
  | "history"
  | "investigation"
  | "nature"
  | "religion"
  | "animal-handling"
  | "insight"
  | "medicine"
  | "perception"
  | "survival"
  | "deception"
  | "intimidation"
  | "performance"
  | "persuasion";

type SkillDefinition = {
  name: SkillName;
  label: string;
  ability: AbilityName;
};

export const SKILLS: SkillDefinition[] = [
  { name: "athletics", label: "Athletics", ability: "str" },
  { name: "acrobatics", label: "Acrobatics", ability: "dex" },
  { name: "sleight-of-hand", label: "Sleight of Hand", ability: "dex" },
  { name: "stealth", label: "Stealth", ability: "dex" },
  { name: "arcana", label: "Arcana", ability: "int" },
  { name: "history", label: "History", ability: "int" },
  { name: "investigation", label: "Investigation", ability: "int" },
  { name: "nature", label: "Nature", ability: "int" },
  { name: "religion", label: "Religion", ability: "int" },
  { name: "animal-handling", label: "Animal Handling", ability: "wis" },
  { name: "insight", label: "Insight", ability: "wis" },
  { name: "medicine", label: "Medicine", ability: "wis" },
  { name: "perception", label: "Perception", ability: "wis" },
  { name: "survival", label: "Survival", ability: "wis" },
  { name: "deception", label: "Deception", ability: "cha" },
  { name: "intimidation", label: "Intimidation", ability: "cha" },
  { name: "performance", label: "Performance", ability: "cha" },
  { name: "persuasion", label: "Persuasion", ability: "cha" },
];

export function skillsForAbility(ability: AbilityName): SkillDefinition[] {
  return SKILLS.filter((s) => s.ability === ability);
}

export function getSkillLabel(skill: SkillName): string {
  const entry = SKILLS.find((s) => s.name === skill);
  return entry ? entry.label : skill;
}

export const DEFAULT_PROFICIENCIES: SkillName[] = ["insight", "perception"];

export function computeSkillModifier({
  abilityModifier,
  proficiencyBonus,
  isProficient,
}: {
  abilityModifier: number;
  proficiencyBonus: number;
  isProficient: boolean;
}): number {
  return abilityModifier + (isProficient ? proficiencyBonus : 0);
}
