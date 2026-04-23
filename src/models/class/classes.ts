import classDetailsData from "src/data/class/class-details.json";
import { GOLD_ICON } from "src/lib/icons";
import { armor } from "src/models/common/gear/armor";
import { weapons } from "src/models/common/gear/weapons";
import {
  resolveResourceResetOn,
  resolveResourcesForLevel,
} from "./class-resources";

import type { AbilityName, AbilityScores } from "src/models/common/abilities";
import type { Equipment } from "src/models/common/gear/equipment";
import type { Background } from "src/models/origin/backgrounds";
import type {
  CharacterResource,
  ResourceId,
  RestType,
} from "./class-resources";

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

const GENERIC_GEAR_IDS = new Set<string>([
  "arcane-focus-crystal",
  "arcane-focus-orb",
  "arcane-focus-quarterstaff",
  "arrows",
  "artisans-tools",
  "book-occult-lore",
  "burglars-pack",
  "druidic-focus",
  "druidic-focus-quarterstaff",
  "dungeoneers-pack",
  "entertainers-pack",
  "explorers-pack",
  "herbalism-kit",
  "holy-symbol",
  "musical-instrument",
  "priests-pack",
  "quiver",
  "robe",
  "scholars-pack",
  "spellbook",
  "thieves-tools",
]);

function formatItemName(item: string): string {
  return item
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toEquipment({ item, quantity }: StartingEquipmentItem): Equipment {
  const weapon = weapons.find({ id: item });
  if (weapon) {
    return {
      type: "weapon",
      name: weapon.name,
      weaponId: weapon.id,
      icon: weapon.icon,
      damage: weapon.damage,
      properties: weapon.properties,
      equipped: true,
      ...(quantity > 1 ? { quantity } : {}),
    };
  }
  const armorItem = armor.find({ id: item });
  if (armorItem) {
    return {
      type: armorItem.category === "shield" ? "shield" : "armor",
      name: armorItem.name,
      armorId: armorItem.id,
      icon: armorItem.icon,
      ac: armorItem.baseAc,
      equipped: true,
    };
  }
  if (item === "gp") {
    return {
      type: "money",
      name: "Gold",
      icon: GOLD_ICON,
      quantity,
    };
  }
  if (!GENERIC_GEAR_IDS.has(item)) {
    throw new Error(`Unknown starting-equipment item: ${item}`);
  }
  return {
    type: "gear",
    name: formatItemName(item),
    ...(quantity > 1 ? { quantity } : {}),
  };
}

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
  startingEquipment({ id }: { id: CharacterClass }): Equipment[] {
    return classes.get({ id }).startingEquipment[0].map(toEquipment);
  },
  resources({
    id,
    level,
    abilityScores,
  }: {
    id: CharacterClass;
    level: number;
    abilityScores: AbilityScores;
  }): CharacterResource[] {
    return resolveResourcesForLevel(id, level, abilityScores);
  },
  resourceResetOn({
    id,
    resourceId,
  }: {
    id: CharacterClass;
    resourceId: ResourceId;
  }): RestType {
    return resolveResourceResetOn(id, resourceId);
  },
};
