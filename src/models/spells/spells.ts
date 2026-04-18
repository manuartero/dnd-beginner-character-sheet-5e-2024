import bardSpellsData from "src/data/spells/bard-spells.json";
import clericSpellsData from "src/data/spells/cleric-spells.json";
import druidSpellsData from "src/data/spells/druid-spells.json";
import paladinSpellsData from "src/data/spells/paladin-spells.json";
import rangerSpellsData from "src/data/spells/ranger-spells.json";
import sorcererSpellsData from "src/data/spells/sorcerer-spells.json";
import cantripsData from "src/data/spells/spells-level-0.json";
import spellsLevel1Data from "src/data/spells/spells-level-1.json";
import warlockSpellsData from "src/data/spells/warlock-spells.json";
import wizardSpellsData from "src/data/spells/wizard-spells.json";

import type { DamageType } from "src/models/common/damage-types";

type SpellId = string;

export type Spell = {
  id: string;
  name: string;
  level: number; // 0 = cantrip
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  concentration: boolean;
  ritual: boolean;
  description: string;
  save?: string;
  damage?: {
    dice: string;
    type: DamageType[];
  };
  icon?: string;
};

const ALL_CANTRIPS = cantripsData as Record<SpellId, Spell>;
const ALL_SPELLS_LEVEL_1 = spellsLevel1Data as Record<SpellId, Spell>;

export const WIZARD_CANTRIP_SELECTION = 3;
export const WIZARD_LEVEL1_SELECTION = 6;

export const BARD_CANTRIP_SELECTION = 2;
export const BARD_LEVEL1_SELECTION = 4;

export const CLERIC_CANTRIP_SELECTION = 3;
export const CLERIC_LEVEL1_SELECTION = 4;

export const DRUID_CANTRIP_SELECTION = 2;
export const DRUID_LEVEL1_SELECTION = 4;

export const SORCERER_CANTRIP_SELECTION = 4;
export const SORCERER_LEVEL1_SELECTION = 2;

export const WARLOCK_CANTRIP_SELECTION = 2;
export const WARLOCK_LEVEL1_SELECTION = 2;

export const PALADIN_CANTRIP_SELECTION = 0;
export const PALADIN_LEVEL1_SELECTION = 0;

export const RANGER_CANTRIP_SELECTION = 0;
export const RANGER_LEVEL1_SELECTION = 0;

export const WIZARD_SPELLS_LEVEL_0: Spell[] = wizardSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const WIZARD_SPELLS_LEVEL_1: Spell[] = wizardSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const BARD_SPELLS_LEVEL_0: Spell[] = bardSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const BARD_SPELLS_LEVEL_1: Spell[] = bardSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const CLERIC_SPELLS_LEVEL_0: Spell[] = clericSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const CLERIC_SPELLS_LEVEL_1: Spell[] = clericSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const DRUID_SPELLS_LEVEL_0: Spell[] = druidSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const DRUID_SPELLS_LEVEL_1: Spell[] = druidSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const SORCERER_SPELLS_LEVEL_0: Spell[] = sorcererSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const SORCERER_SPELLS_LEVEL_1: Spell[] = sorcererSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const WARLOCK_SPELLS_LEVEL_0: Spell[] = warlockSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const WARLOCK_SPELLS_LEVEL_1: Spell[] = warlockSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const PALADIN_SPELLS_LEVEL_0: Spell[] = paladinSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const PALADIN_SPELLS_LEVEL_1: Spell[] = paladinSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);

export const RANGER_SPELLS_LEVEL_0: Spell[] = rangerSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const RANGER_SPELLS_LEVEL_1: Spell[] = rangerSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);
