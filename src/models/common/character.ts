import type { CharacterResource } from "src/models/class/class-resources";
import type { CharacterClass } from "src/models/class/classes";
import type { Equipment } from "src/models/gear/equipment";
import type { Background } from "src/models/origin/backgrounds";
import type { Species } from "src/models/origin/species";
import type { Spell } from "src/models/spells/spells";
import type { AbilityScores } from "./abilities";

export type Character = {
  id: string;
  name: string;
  race: Species;
  characterClass: CharacterClass;
  background?: Background;
  level: number;
  abilityScores: AbilityScores;
  hp: { current: number; max: number };
  ac: number;
  proficiencyBonus: number;
  spells: Spell[];
  weaponMasteries?: string[];
  equipment: Equipment[];
  classResources: CharacterResource[];
};
