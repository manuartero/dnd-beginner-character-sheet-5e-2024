import type { AbilityName } from "src/models/abilities";
import type { CharacterClass } from "src/models/classes";

export type ClassDetails = {
  hitDie: string;
  primaryAbilities: AbilityName[];
  saves: string;
  description: string;
};

export const CLASS_DETAILS: Record<CharacterClass, ClassDetails> = {
  barbarian: {
    hitDie: "d12",
    primaryAbilities: ["str"],
    saves: "Strength & Constitution",
    description: "A fierce warrior of primal rage",
  },
  bard: {
    hitDie: "d8",
    primaryAbilities: ["cha"],
    saves: "Dexterity & Charisma",
    description: "An inspiring performer of music, dance, and magic",
  },
  cleric: {
    hitDie: "d8",
    primaryAbilities: ["wis"],
    saves: "Wisdom & Charisma",
    description: "A miraculous priest of divine power",
  },
  druid: {
    hitDie: "d8",
    primaryAbilities: ["wis"],
    saves: "Intelligence & Wisdom",
    description: "A nature priest of primal power",
  },
  fighter: {
    hitDie: "d10",
    primaryAbilities: ["str", "dex"],
    saves: "Strength & Constitution",
    description: "A master of all arms and armor",
  },
  monk: {
    hitDie: "d8",
    primaryAbilities: ["dex", "wis"],
    saves: "Strength & Dexterity",
    description: "A martial artist of supernatural focus",
  },
  paladin: {
    hitDie: "d10",
    primaryAbilities: ["str", "cha"],
    saves: "Wisdom & Charisma",
    description: "A devout warrior of sacred oaths",
  },
  ranger: {
    hitDie: "d10",
    primaryAbilities: ["dex", "wis"],
    saves: "Strength & Dexterity",
    description: "A wandering warrior imbued with primal magic",
  },
  rogue: {
    hitDie: "d8",
    primaryAbilities: ["dex"],
    saves: "Dexterity & Intelligence",
    description: "A dexterous expert in stealth and subterfuge",
  },
  sorcerer: {
    hitDie: "d6",
    primaryAbilities: ["cha"],
    saves: "Constitution & Charisma",
    description: "A dazzling mage filled with innate magic",
  },
  warlock: {
    hitDie: "d8",
    primaryAbilities: ["cha"],
    saves: "Wisdom & Charisma",
    description: "An occultist empowered by otherworldly pacts",
  },
  wizard: {
    hitDie: "d6",
    primaryAbilities: ["int"],
    saves: "Intelligence & Wisdom",
    description: "A scholarly magic-user of arcane power",
  },
};
