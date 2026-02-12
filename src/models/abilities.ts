export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type AbilityScores = Record<AbilityName, number>;

export const ABILITY_LIST: {
  key: AbilityName;
  label: string;
  short: string;
}[] = [
  { key: "str", label: "Strength", short: "STR" },
  { key: "dex", label: "Dexterity", short: "DEX" },
  { key: "con", label: "Constitution", short: "CON" },
  { key: "int", label: "Intelligence", short: "INT" },
  { key: "wis", label: "Wisdom", short: "WIS" },
  { key: "cha", label: "Charisma", short: "CHA" },
];

export function computeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
