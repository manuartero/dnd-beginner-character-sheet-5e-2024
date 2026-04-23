import type { DamageType } from "src/models/common/damage";
import type { ArmorId } from "./armor";
import type { WeaponId } from "./weapons";

type Damage = { dice: string; type: DamageType };

type WeaponEquipment = {
  type: "weapon";
  name: string;
  weaponId?: WeaponId;
  damage: Damage;
  properties: string[];
  icon?: string;
  quantity?: number;
  equipped?: boolean;
  attackBonus?: number;
};

type ArmorEquipment = {
  type: "armor";
  name: string;
  armorId: ArmorId;
  ac: number;
  icon?: string;
  equipped?: boolean;
};

type ShieldEquipment = {
  type: "shield";
  name: string;
  armorId: ArmorId;
  ac: number;
  icon?: string;
  equipped?: boolean;
};

type GearEquipment = {
  type: "gear";
  name: string;
  icon?: string;
  quantity?: number;
};

type MoneyEquipment = {
  type: "money";
  name: string;
  icon?: string;
  quantity: number;
};

export type Equipment =
  | WeaponEquipment
  | ArmorEquipment
  | ShieldEquipment
  | GearEquipment
  | MoneyEquipment;
