import cantripsData from "src/data/spells-level-0.json";
import spellsLevel1Data from "src/data/spells-level-1.json";
import wizardSpellsData from "src/data/wizard-spells.json";

import type { DamageType } from "./damage-types";

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
  description: string;
  damage?: {
    dice: string;
    type: DamageType;
  };
  icon?: string;
};

const ALL_CANTRIPS = cantripsData as Record<SpellId, Spell>;
const ALL_SPELLS_LEVEL_1 = spellsLevel1Data as Record<SpellId, Spell>;

export const WIZARD_SPELLS_LEVEL_0: Spell[] = wizardSpellsData.cantrips.map(
  (id) => ALL_CANTRIPS[id],
);

export const WIZARD_SPELLS_LEVEL_1: Spell[] = wizardSpellsData.level1.map(
  (id) => ALL_SPELLS_LEVEL_1[id],
);
