import weaponMasteryData from "src/data/gear/weapon-mastery.json";
import weaponPropertiesData from "src/data/gear/weapon-properties.json";
import weaponsData from "src/data/gear/weapons.json";

import type { DamageType } from "src/models/common/damage-types";

export type WeaponProficiency = "simple" | "martial";

export type WeaponRange = "melee" | "ranged";

export type WeaponMasteryName =
  | "cleave"
  | "graze"
  | "nick"
  | "push"
  | "sap"
  | "slow"
  | "topple"
  | "vex";

export type Weapon = {
  id: string;
  name: string;
  proficiency: WeaponProficiency;
  range: WeaponRange;
  damage: {
    dice: string;
    type: DamageType;
  };
  properties: string[];
  mastery: WeaponMasteryName;
  icon: string;
};

export type WeaponProperty = {
  id: string;
  description: string;
};

export type WeaponMasteryDetails = {
  id: WeaponMasteryName;
  description: string;
};

type WeaponCriteria = { id: string } | { name: string };

const WEAPONS_DATA = weaponsData as Weapon[];
const WEAPONS_BY_ID = new Map(WEAPONS_DATA.map((w) => [w.id, w]));
const WEAPONS_BY_NAME = new Map(
  WEAPONS_DATA.map((w) => [w.name.toLowerCase(), w]),
);

const PROPERTIES_RAW = weaponPropertiesData as Record<string, string>;
const PROPERTIES_DATA: WeaponProperty[] = Object.entries(PROPERTIES_RAW).map(
  ([id, description]) => ({ id, description }),
);
const PROPERTIES_BY_ID = new Map(PROPERTIES_DATA.map((p) => [p.id, p]));

const MASTERY_RAW = weaponMasteryData as Record<WeaponMasteryName, string>;
const MASTERY_DATA: WeaponMasteryDetails[] = Object.entries(MASTERY_RAW).map(
  ([id, description]) => ({ id: id as WeaponMasteryName, description }),
);
const MASTERY_BY_ID = new Map(MASTERY_DATA.map((m) => [m.id, m]));

function lookupWeapon(criteria: WeaponCriteria): Weapon | undefined {
  if ("id" in criteria) return WEAPONS_BY_ID.get(criteria.id);
  return WEAPONS_BY_NAME.get(criteria.name.toLowerCase());
}

export const weapons = {
  get(criteria: WeaponCriteria): Weapon {
    const found = lookupWeapon(criteria);
    if (!found) throw new Error(`Unknown weapon: ${JSON.stringify(criteria)}`);
    return found;
  },
  find(criteria: WeaponCriteria): Weapon | undefined {
    return lookupWeapon(criteria);
  },
  list(): Weapon[] {
    return WEAPONS_DATA;
  },
};

export const weaponProperties = {
  get({ id }: { id: string }): WeaponProperty {
    const found = PROPERTIES_BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon property: ${id}`);
    return found;
  },
  find({ id }: { id: string }): WeaponProperty | undefined {
    return PROPERTIES_BY_ID.get(id);
  },
  list(): WeaponProperty[] {
    return PROPERTIES_DATA;
  },
};

export const weaponMastery = {
  get({ id }: { id: WeaponMasteryName }): WeaponMasteryDetails {
    const found = MASTERY_BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon mastery: ${id}`);
    return found;
  },
  find({ id }: { id: string }): WeaponMasteryDetails | undefined {
    return MASTERY_BY_ID.get(id as WeaponMasteryName);
  },
  list(): WeaponMasteryDetails[] {
    return MASTERY_DATA;
  },
};
