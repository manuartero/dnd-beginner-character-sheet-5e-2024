import skillsData from "src/data/common/skills.json";

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

const DATA = skillsData as SkillDefinition[];
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
