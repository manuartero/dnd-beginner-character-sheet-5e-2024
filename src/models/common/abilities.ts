import abilitiesData from "src/data/common/abilities.json";

export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type AbilityScores = Record<AbilityName, number>;

export type AbilityDetails = {
  id: AbilityName;
  label: string;
  short: string;
};

const DATA = abilitiesData as AbilityDetails[];
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
