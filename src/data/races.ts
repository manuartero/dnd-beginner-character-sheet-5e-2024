export type CharacterRace =
  | "aasimar"
  | "dragonborn"
  | "dwarf"
  | "elf"
  | "gnome"
  | "goliath"
  | "halfling"
  | "human"
  | "orc"
  | "tiefling";

export const RACE_LIST: { key: CharacterRace; label: string }[] = [
  { key: "aasimar", label: "Aasimar" },
  { key: "dragonborn", label: "Dragonborn" },
  { key: "dwarf", label: "Dwarf" },
  { key: "elf", label: "Elf" },
  { key: "gnome", label: "Gnome" },
  { key: "goliath", label: "Goliath" },
  { key: "halfling", label: "Halfling" },
  { key: "human", label: "Human" },
  { key: "orc", label: "Orc" },
  { key: "tiefling", label: "Tiefling" },
];
