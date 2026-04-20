import armorData from "src/data/gear/armor.json";

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

const DATA = armorData as Armor[];
const BY_ID = new Map(DATA.map((a) => [a.id, a]));
const BY_NAME = new Map(DATA.map((a) => [a.name, a]));

export const armor = {
  get(id: string): Armor {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown armor: ${id}`);
    return found;
  },
  find(id: string): Armor | undefined {
    return BY_ID.get(id);
  },
  list(): Armor[] {
    return DATA;
  },
  findByName(name: string): Armor | undefined {
    return BY_NAME.get(name);
  },
};
