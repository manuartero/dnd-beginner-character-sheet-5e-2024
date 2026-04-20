export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type AbilityScores = Record<AbilityName, number>;

export type AbilityDetails = {
  label: string;
  short: string;
};

const DATA: Record<AbilityName, AbilityDetails> = {
  str: { label: "Strength", short: "STR" },
  dex: { label: "Dexterity", short: "DEX" },
  con: { label: "Constitution", short: "CON" },
  int: { label: "Intelligence", short: "INT" },
  wis: { label: "Wisdom", short: "WIS" },
  cha: { label: "Charisma", short: "CHA" },
};

const ORDER: AbilityName[] = ["str", "dex", "con", "int", "wis", "cha"];

export const abilities = {
  get(id: AbilityName): AbilityDetails {
    return DATA[id];
  },
  list(): { id: AbilityName; details: AbilityDetails }[] {
    return ORDER.map((id) => ({ id, details: DATA[id] }));
  },
};

export function computeProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export function computeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
