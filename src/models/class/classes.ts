import classDetailsData from "src/data/class/class-details.json";

import type { AbilityName } from "src/models/common/abilities";
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

const DATA = classDetailsData as Record<CharacterClass, ClassDetails>;

const CATEGORY_LABELS: Record<ManualClassification, string> = {
  martial: "Martial",
  "spell-caster": "Spell Casters",
  versatile: "Versatile",
};

const CATEGORY_ORDER: ManualClassification[] = [
  "martial",
  "spell-caster",
  "versatile",
];

export const classes = {
  get(id: CharacterClass): ClassDetails {
    return DATA[id];
  },
  find(id: string): ClassDetails | undefined {
    return DATA[id as CharacterClass];
  },
  list(): { id: CharacterClass; details: ClassDetails }[] {
    return Object.entries(DATA).map(([id, details]) => ({
      id: id as CharacterClass,
      details,
    }));
  },
  byCategory(): {
    classification: ManualClassification;
    label: string;
    classes: { id: CharacterClass; details: ClassDetails }[];
  }[] {
    const all = classes.list();
    return CATEGORY_ORDER.map((classification) => ({
      classification,
      label: CATEGORY_LABELS[classification],
      classes: all.filter(
        ({ details }) => details.manualClassification === classification,
      ),
    }));
  },
};
