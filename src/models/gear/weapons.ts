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

const WEAPONS_DATA = weaponsData as Weapon[];
const PROPERTIES_DATA = weaponPropertiesData as Record<string, string>;
const MASTERY_DATA = weaponMasteryData as Record<WeaponMasteryName, string>;

const WEAPONS_BY_ID = new Map(WEAPONS_DATA.map((w) => [w.id, w]));
const WEAPONS_BY_NAME = new Map(
  WEAPONS_DATA.map((w) => [w.name.toLowerCase(), w]),
);

export const weapons = {
  get(id: string): Weapon {
    const found = WEAPONS_BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon: ${id}`);
    return found;
  },
  find(id: string): Weapon | undefined {
    return WEAPONS_BY_ID.get(id);
  },
  list(): Weapon[] {
    return WEAPONS_DATA;
  },
  findByName(name: string): Weapon | undefined {
    return WEAPONS_BY_NAME.get(name.toLowerCase());
  },
};

export const weaponProperties = {
  get(id: string): string {
    const found = PROPERTIES_DATA[id];
    if (found === undefined) throw new Error(`Unknown weapon property: ${id}`);
    return found;
  },
  find(id: string): string | undefined {
    return PROPERTIES_DATA[id];
  },
  list(): { id: string; description: string }[] {
    return Object.entries(PROPERTIES_DATA).map(([id, description]) => ({
      id,
      description,
    }));
  },
};

export const weaponMastery = {
  get(name: WeaponMasteryName): string {
    return MASTERY_DATA[name];
  },
  find(name: string): string | undefined {
    return MASTERY_DATA[name as WeaponMasteryName];
  },
  list(): { id: WeaponMasteryName; description: string }[] {
    return Object.entries(MASTERY_DATA).map(([id, description]) => ({
      id: id as WeaponMasteryName,
      description,
    }));
  },
};
