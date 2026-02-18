import type { DamageType } from "./damage-types";

export const GOLD_ICON = "vol1/icon-vol1_63";

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
};
