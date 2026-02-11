import type { CharacterClass } from "src/data/types";

export const CLASS_LIST: { key: CharacterClass; label: string }[] = [
  { key: "barbarian", label: "Barbarian" },
  { key: "bard", label: "Bard" },
  { key: "cleric", label: "Cleric" },
  { key: "druid", label: "Druid" },
  { key: "fighter", label: "Fighter" },
  { key: "monk", label: "Monk" },
  { key: "paladin", label: "Paladin" },
  { key: "ranger", label: "Ranger" },
  { key: "rogue", label: "Rogue" },
  { key: "sorcerer", label: "Sorcerer" },
  { key: "warlock", label: "Warlock" },
  { key: "wizard", label: "Wizard" },
];

export const CLASS_COLORS: Record<CharacterClass, string> = {
  barbarian: "var(--color-barbarian)",
  bard: "var(--color-bard)",
  cleric: "var(--color-cleric)",
  druid: "var(--color-druid)",
  fighter: "var(--color-fighter)",
  monk: "var(--color-monk)",
  paladin: "var(--color-paladin)",
  ranger: "var(--color-ranger)",
  rogue: "var(--color-rogue)",
  sorcerer: "var(--color-sorcerer)",
  warlock: "var(--color-warlock)",
  wizard: "var(--color-wizard)",
};
