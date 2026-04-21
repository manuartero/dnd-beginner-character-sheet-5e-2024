import type { DamageType } from "src/models/common/damage";
import type { ArmorId } from "./armor";

export type Equipment = {
  name: string;
  type: "weapon" | "armor" | "shield" | "gear" | "money";
  armorId?: ArmorId;
  attackBonus?: number;
  damage?: {
    dice: string;
    type: DamageType;
  };
  ac?: number;
  icon?: string;
  properties?: string[];
  quantity?: number;
  equipped?: boolean;
};
