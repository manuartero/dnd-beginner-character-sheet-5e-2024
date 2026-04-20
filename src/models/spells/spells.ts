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

import type { CharacterClass } from "src/models/class/classes";
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

function resolveSpells(data: {
  cantrips: string[];
  level1: string[];
}): [level0: Spell[], level1: Spell[]] {
  return [
    data.cantrips.map((id) => ALL_CANTRIPS[id]),
    data.level1.map((id) => ALL_SPELLS_LEVEL_1[id]),
  ];
}

const CLASS_DATA: Partial<
  Record<
    CharacterClass,
    {
      spells: [level0: Spell[], level1: Spell[]];
      selections: [cantrips: number, level1: number];
    }
  >
> = {
  wizard: { spells: resolveSpells(wizardSpellsData), selections: [3, 6] },
  bard: { spells: resolveSpells(bardSpellsData), selections: [2, 4] },
  cleric: { spells: resolveSpells(clericSpellsData), selections: [3, 4] },
  druid: { spells: resolveSpells(druidSpellsData), selections: [2, 4] },
  sorcerer: { spells: resolveSpells(sorcererSpellsData), selections: [4, 2] },
  warlock: { spells: resolveSpells(warlockSpellsData), selections: [2, 2] },
  paladin: { spells: resolveSpells(paladinSpellsData), selections: [0, 0] },
  ranger: { spells: resolveSpells(rangerSpellsData), selections: [0, 0] },
};

export const spells = {
  findAll({ cls, level }: { cls: CharacterClass; level: 0 | 1 }): Spell[] {
    return CLASS_DATA[cls]?.spells[level] ?? [];
  },
  limit({ cls, level }: { cls: CharacterClass; level: 0 | 1 }): number {
    return CLASS_DATA[cls]?.selections[level] ?? 0;
  },
};
