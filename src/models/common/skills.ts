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

export type SkillDefinition = {
  name: SkillName;
  label: string;
  ability: AbilityName;
};

const DATA: SkillDefinition[] = [
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

const BY_NAME = new Map(DATA.map((s) => [s.name, s]));

export const skills = {
  get({ name }: { name: SkillName }): SkillDefinition {
    const found = BY_NAME.get(name);
    if (!found) throw new Error(`Unknown skill: ${name}`);
    return found;
  },
  find({ name }: { name: string }): SkillDefinition | undefined {
    return BY_NAME.get(name as SkillName);
  },
  list(): SkillDefinition[] {
    return DATA;
  },
  findAll({ ability }: { ability: AbilityName }): SkillDefinition[] {
    return DATA.filter((s) => s.ability === ability);
  },
};

export const DEFAULT_PROFICIENCIES: SkillName[] = ["insight", "perception"];
