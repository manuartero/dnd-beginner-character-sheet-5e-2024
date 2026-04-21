import weaponsData from "src/data/gear/weapons.json";

import type { DamageType } from "src/models/common/damage";
import type { WeaponMasteryName } from "./weapon-mastery";

export type WeaponProficiency = "simple" | "martial";

export type WeaponRange = "melee" | "ranged";

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

type WeaponCriteria = { id: string } | { name: string };

const DATA = weaponsData as Weapon[];
const BY_ID = new Map(DATA.map((w) => [w.id, w]));
const BY_NAME = new Map(DATA.map((w) => [w.name.toLowerCase(), w]));

function lookup(criteria: WeaponCriteria): Weapon | undefined {
  if ("id" in criteria) return BY_ID.get(criteria.id);
  return BY_NAME.get(criteria.name.toLowerCase());
}

export const weapons = {
  get(criteria: WeaponCriteria): Weapon {
    const found = lookup(criteria);
    if (!found) throw new Error(`Unknown weapon: ${JSON.stringify(criteria)}`);
    return found;
  },
  find(criteria: WeaponCriteria): Weapon | undefined {
    return lookup(criteria);
  },
  list(): Weapon[] {
    return DATA;
  },
};
