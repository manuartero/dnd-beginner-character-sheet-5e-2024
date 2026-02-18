import weaponMasteryData from "src/data/weapon-mastery.json";
import weaponPropertiesData from "src/data/weapon-properties.json";
import weaponsData from "src/data/weapons.json";

import type { DamageType } from "./damage-types";

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

export const WEAPONS: Weapon[] = weaponsData as Weapon[];

export const WEAPON_PROPERTIES: Record<string, string> =
  weaponPropertiesData as Record<string, string>;

export const WEAPON_MASTERY: Record<WeaponMasteryName, string> =
  weaponMasteryData as Record<WeaponMasteryName, string>;

export function getWeaponsByProficiency(
  proficiency: WeaponProficiency,
): Weapon[] {
  return WEAPONS.filter((w) => w.proficiency === proficiency);
}

export function getWeaponsByRange(range: WeaponRange): Weapon[] {
  return WEAPONS.filter((w) => w.range === range);
}

export function getWeaponById(id: string): Weapon | undefined {
  return WEAPONS.find((w) => w.id === id);
}

export function getWeaponByName(name: string): Weapon | undefined {
  return WEAPONS.find((w) => w.name.toLowerCase() === name.toLowerCase());
}
