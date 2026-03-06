import armorData from "src/data/armor.json";

export type ArmorCategory = "light" | "medium" | "heavy" | "shield";

export type Armor = {
  id: string;
  name: string;
  category: ArmorCategory;
  baseAc: number;
  dexModifier: boolean;
  maxDexModifier: number | null;
  requiredStr: number | null;
  stealthDisadvantage: boolean;
  icon: string;
};

export const ARMORS: Armor[] = armorData as Armor[];

const ARMORS_BY_ID = new Map(ARMORS.map((a) => [a.id, a]));

export function getArmorById(id: string): Armor | undefined {
  return ARMORS_BY_ID.get(id);
}
