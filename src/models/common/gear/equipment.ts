import type { DamageType } from "src/models/common/damage";

export type Equipment = {
  name: string;
  type: "weapon" | "armor" | "shield" | "gear" | "money";
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
