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

type ArmorCriteria = { id: string } | { name: string };

const DATA = armorData as Armor[];
const BY_ID = new Map(DATA.map((a) => [a.id, a]));
const BY_NAME = new Map(DATA.map((a) => [a.name, a]));

function lookup(criteria: ArmorCriteria): Armor | undefined {
  if ("id" in criteria) return BY_ID.get(criteria.id);
  return BY_NAME.get(criteria.name);
}

export const armor = {
  get(criteria: ArmorCriteria): Armor {
    const found = lookup(criteria);
    if (!found) throw new Error(`Unknown armor: ${JSON.stringify(criteria)}`);
    return found;
  },
  find(criteria: ArmorCriteria): Armor | undefined {
    return lookup(criteria);
  },
  list(): Armor[] {
    return DATA;
  },
};
