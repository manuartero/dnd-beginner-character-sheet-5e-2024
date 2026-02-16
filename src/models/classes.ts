import classDetailsData from "src/data/class-details.json";
import type { AbilityName } from "src/models/abilities";
import type { Background } from "src/models/backgrounds";

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

export const CLASS_DETAILS: Record<CharacterClass, ClassDetails> =
  classDetailsData as Record<CharacterClass, ClassDetails>;

export const CLASS_LIST: { key: CharacterClass; label: string }[] =
  Object.entries(CLASS_DETAILS).map(([key, value]) => ({
    key: key as CharacterClass,
    label: value.label,
  }));

type ClassListEntry = { key: CharacterClass; label: string };

export const CLASSES_BY_CATEGORY: {
  classification: ManualClassification;
  label: string;
  classes: ClassListEntry[];
}[] = [
  { classification: "martial", label: "Martial", classes: [] },
  { classification: "spell-caster", label: "Spell Casters", classes: [] },
  { classification: "versatile", label: "Versatile", classes: [] },
].map((group) => ({
  ...group,
  classes: CLASS_LIST.filter(
    (c) => CLASS_DETAILS[c.key].manualClassification === group.classification,
  ),
}));

export function getClassIcon(characterClass: CharacterClass): string {
  return CLASS_DETAILS[characterClass].icon;
}
