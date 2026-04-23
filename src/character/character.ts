import type { CharacterResource } from "src/models/class/class-resources";
import type { CharacterClass } from "src/models/class/classes";
import type { AbilityScores } from "src/models/common/abilities";
import type { Equipment } from "src/models/common/gear";
import type { WeaponMasteryName } from "src/models/common/gear/weapon-mastery";
import type { Background } from "src/models/origin/backgrounds";
import type { Species } from "src/models/origin/species";
import type { Spell } from "src/models/spells/spells";

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
  weaponMasteries?: WeaponMasteryName[];
  equipment: Equipment[];
  classResources: CharacterResource[];
};
