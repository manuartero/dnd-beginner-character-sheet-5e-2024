export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type AbilityScores = Record<AbilityName, number>;

export type AbilityDetails = {
  id: AbilityName;
  label: string;
  short: string;
};

const DATA: AbilityDetails[] = [
  { id: "str", label: "Strength", short: "STR" },
  { id: "dex", label: "Dexterity", short: "DEX" },
  { id: "con", label: "Constitution", short: "CON" },
  { id: "int", label: "Intelligence", short: "INT" },
  { id: "wis", label: "Wisdom", short: "WIS" },
  { id: "cha", label: "Charisma", short: "CHA" },
];

const BY_ID = new Map(DATA.map((a) => [a.id, a]));

export const abilities = {
  get({ id }: { id: AbilityName }): AbilityDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown ability: ${id}`);
    return found;
  },
  list(): AbilityDetails[] {
    return DATA;
  },
};
