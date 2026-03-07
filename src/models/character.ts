import type { AbilityScores } from "./abilities";
import type { Background } from "./backgrounds";
import type { CharacterResource } from "./class-resources";
import type { CharacterClass } from "./classes";
import type { Equipment } from "./equipment";
import type { Species } from "./species";
import type { Spell } from "./spells";

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
