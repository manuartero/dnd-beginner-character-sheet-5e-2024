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

export function getArmorById(id: string): Armor | undefined {
  return ARMORS.find((a) => a.id === id);
}

export function getArmorsByCategory(category: ArmorCategory): Armor[] {
  return ARMORS.filter((a) => a.category === category);
}
