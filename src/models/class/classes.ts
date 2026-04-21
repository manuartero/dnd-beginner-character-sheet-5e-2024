import classDetailsData from "src/data/class/class-details.json";

import type { AbilityName, AbilityScores } from "src/models/common/abilities";
import type { Background } from "src/models/origin/backgrounds";

export type CharacterClass =
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard";

type WeaponProficiencyValue = boolean | { property: string[] };

export type ProficiencyKey =
  | "light-armor"
  | "medium-armor"
  | "heavy-armor"
  | "shields"
  | "simple-weapons"
  | "martial-weapons";

export type ProficiencySet = {
  "light-armor": boolean;
  "medium-armor": boolean;
  "heavy-armor": boolean;
  shields: boolean;
  "simple-weapons": boolean;
  "martial-weapons": WeaponProficiencyValue;
  skills: { n: number; options: string[] };
  tools?: string[];
};

export type StartingEquipmentItem = {
  item: string;
  quantity: number;
};

export type ManualClassification = "martial" | "spell-caster" | "versatile";

export type ClassDetails = {
  id: CharacterClass;
  label: string;
  icon: string;
  hitDie: string;
  primaryAbilities: AbilityName[];
  saves: string;
  description: string;
  manualClassification: ManualClassification;
  recommendedBackgrounds: Background[];
  proficiencies: ProficiencySet;
  startingEquipment: [StartingEquipmentItem[], StartingEquipmentItem[]];
  recommendedScores: AbilityScores;
};

export function hasProficiency(
  proficiencies: ProficiencySet,
  key: ProficiencyKey,
): boolean {
  const value = proficiencies[key];
  if (typeof value === "object" && value !== null) {
    return true;
  }
  return value === true;
}

export function getProficiencyRestriction(
  proficiencies: ProficiencySet,
  key: ProficiencyKey,
): string[] | null {
  const value = proficiencies[key];
  if (typeof value === "object" && value !== null) {
    return value.property;
  }
  return null;
}

const RAW = classDetailsData as Record<
  CharacterClass,
  Omit<ClassDetails, "id">
>;
const DATA: ClassDetails[] = Object.entries(RAW).map(([id, v]) => ({
  id: id as CharacterClass,
  ...v,
}));
const BY_ID = new Map(DATA.map((c) => [c.id, c]));

const CLASSIFICATION_ORDER: ManualClassification[] = [
  "martial",
  "spell-caster",
  "versatile",
];

export const classes = {
  get({ id }: { id: CharacterClass }): ClassDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown class: ${id}`);
    return found;
  },
  find({ id }: { id: string }): ClassDetails | undefined {
    return BY_ID.get(id as CharacterClass);
  },
  list(): ClassDetails[] {
    return DATA;
  },
  groupBy({
    by,
  }: {
    by: "classification";
  }): { key: ManualClassification; items: ClassDetails[] }[] {
    if (by !== "classification") throw new Error(`Unknown group axis: ${by}`);
    return CLASSIFICATION_ORDER.map((key) => ({
      key,
      items: DATA.filter((c) => c.manualClassification === key),
    }));
  },
};
