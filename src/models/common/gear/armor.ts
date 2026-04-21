import armorData from "src/data/gear/armor.json";

export type ArmorId =
  | "padded-armor"
  | "leather-armor"
  | "studded-leather-armor"
  | "hide-armor"
  | "chain-shirt"
  | "scale-mail"
  | "breastplate"
  | "half-plate-armor"
  | "ring-mail"
  | "chain-mail"
  | "splint-armor"
  | "plate-armor"
  | "shield";

export type ArmorCategory = "light" | "medium" | "heavy" | "shield";

export type Armor = {
  id: ArmorId;
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

export const armor = {
  get({ id }: { id: ArmorId }): Armor {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown armor: ${id}`);
    return found;
  },
  find({ id }: { id: string }): Armor | undefined {
    return BY_ID.get(id as ArmorId);
  },
  list(): Armor[] {
    return DATA;
  },
};
