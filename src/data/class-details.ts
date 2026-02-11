import type { CharacterClass } from "src/data/classes";

export type ClassDetails = {
  hitDie: string;
  primaryAbility: string;
  saves: string;
  description: string;
};

export const CLASS_DETAILS: Record<CharacterClass, ClassDetails> = {
  barbarian: {
    hitDie: "d12",
    primaryAbility: "Strength",
    saves: "Strength & Constitution",
    description: "A fierce warrior of primal rage",
  },
  bard: {
    hitDie: "d8",
    primaryAbility: "Charisma",
    saves: "Dexterity & Charisma",
    description: "An inspiring performer of music, dance, and magic",
  },
  cleric: {
    hitDie: "d8",
    primaryAbility: "Wisdom",
    saves: "Wisdom & Charisma",
    description: "A miraculous priest of divine power",
  },
  druid: {
    hitDie: "d8",
    primaryAbility: "Wisdom",
    saves: "Intelligence & Wisdom",
    description: "A nature priest of primal power",
  },
  fighter: {
    hitDie: "d10",
    primaryAbility: "Strength or Dexterity",
    saves: "Strength & Constitution",
    description: "A master of all arms and armor",
  },
  monk: {
    hitDie: "d8",
    primaryAbility: "Dexterity & Wisdom",
    saves: "Strength & Dexterity",
    description: "A martial artist of supernatural focus",
  },
  paladin: {
    hitDie: "d10",
    primaryAbility: "Strength & Charisma",
    saves: "Wisdom & Charisma",
    description: "A devout warrior of sacred oaths",
  },
  ranger: {
    hitDie: "d10",
    primaryAbility: "Dexterity & Wisdom",
    saves: "Strength & Dexterity",
    description: "A wandering warrior imbued with primal magic",
  },
  rogue: {
    hitDie: "d8",
    primaryAbility: "Dexterity",
    saves: "Dexterity & Intelligence",
    description: "A dexterous expert in stealth and subterfuge",
  },
  sorcerer: {
    hitDie: "d6",
    primaryAbility: "Charisma",
    saves: "Constitution & Charisma",
    description: "A dazzling mage filled with innate magic",
  },
  warlock: {
    hitDie: "d8",
    primaryAbility: "Charisma",
    saves: "Wisdom & Charisma",
    description: "An occultist empowered by otherworldly pacts",
  },
  wizard: {
    hitDie: "d6",
    primaryAbility: "Intelligence",
    saves: "Intelligence & Wisdom",
    description: "A scholarly magic-user of arcane power",
  },
};
