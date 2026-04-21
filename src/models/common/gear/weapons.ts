import weaponsData from "src/data/common/gear/weapons.json";

import type { DamageType } from "src/models/common/damage";
import type { WeaponMasteryName } from "./weapon-mastery";

export type WeaponId =
  | "club"
  | "dagger"
  | "greatclub"
  | "handaxe"
  | "javelin"
  | "light-hammer"
  | "mace"
  | "quarterstaff"
  | "sickle"
  | "spear"
  | "dart"
  | "light-crossbow"
  | "shortbow"
  | "sling"
  | "battleaxe"
  | "flail"
  | "glaive"
  | "greataxe"
  | "greatsword"
  | "halberd"
  | "lance"
  | "longsword"
  | "maul"
  | "morningstar"
  | "pike"
  | "rapier"
  | "scimitar"
  | "shortsword"
  | "trident"
  | "warhammer"
  | "war-pick"
  | "whip"
  | "blowgun"
  | "hand-crossbow"
  | "heavy-crossbow"
  | "longbow"
  | "musket"
  | "pistol";

export type WeaponProficiency = "simple" | "martial";

export type WeaponRange = "melee" | "ranged";

export type Weapon = {
  id: WeaponId;
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

const DATA = weaponsData as Weapon[];
const BY_ID = new Map(DATA.map((w) => [w.id, w]));

export const weapons = {
  get({ id }: { id: WeaponId }): Weapon {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon: ${id}`);
    return found;
  },
  find({ id }: { id: string }): Weapon | undefined {
    return BY_ID.get(id as WeaponId);
  },
  list(): Weapon[] {
    return DATA;
  },
};
