import type { DamageType } from "./damage-types";

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
