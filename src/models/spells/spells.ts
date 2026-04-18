import bardSpellsData from "src/data/spells/bard-spells.json";
import clericSpellsData from "src/data/spells/cleric-spells.json";
import druidSpellsData from "src/data/spells/druid-spells.json";
import cantripsData from "src/data/spells/spells-level-0.json";
import spellsLevel1Data from "src/data/spells/spells-level-1.json";
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
    type: DamageType;
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
