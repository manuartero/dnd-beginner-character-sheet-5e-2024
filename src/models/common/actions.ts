import actionsData from "src/data/common/actions.json";

import type {
  CharacterClass,
  ManualClassification,
} from "src/models/class/classes";

export type ActionTiming = "action" | "bonus-action" | "reaction";

export type ExplorationCategory = "exploration" | "social";

export type CombatAction = {
  name: string;
  timing: ActionTiming;
  icon?: string;
  description: string;
};

export type ClassAction = CombatAction & {
  classRestriction?: CharacterClass;
  classificationRestriction?: ManualClassification[];
};

export type ExplorationAction = {
  name: string;
  category: ExplorationCategory;
  icon?: string;
  description: string;
  classificationRestriction?: ManualClassification[];
};

const COMBAT = actionsData.combat as CombatAction[];
const CLASS = actionsData.class as ClassAction[];
const EXPLORATION = actionsData.exploration as ExplorationAction[];

export const combatActions = {
  get({ name }: { name: string }): CombatAction {
    const found = COMBAT.find((a) => a.name === name);
    if (!found) throw new Error(`Unknown combat action: ${name}`);
    return found;
  },
  find({ name }: { name: string }): CombatAction | undefined {
    return COMBAT.find((a) => a.name === name);
  },
  list(): CombatAction[] {
    return COMBAT;
  },
};

export const classActions = {
  get({ name }: { name: string }): ClassAction {
    const found = CLASS.find((a) => a.name === name);
    if (!found) throw new Error(`Unknown class action: ${name}`);
    return found;
  },
  find({ name }: { name: string }): ClassAction | undefined {
    return CLASS.find((a) => a.name === name);
  },
  list(): ClassAction[] {
    return CLASS;
  },
  findAll({
    cls,
    classification,
  }: {
    cls: CharacterClass;
    classification: ManualClassification;
  }): ClassAction[] {
    return CLASS.filter((a) => {
      if (a.classRestriction && a.classRestriction !== cls) return false;
      if (
        a.classificationRestriction &&
        !a.classificationRestriction.includes(classification)
      )
        return false;
      return true;
    });
  },
};

export const explorationActions = {
  get({ name }: { name: string }): ExplorationAction {
    const found = EXPLORATION.find((a) => a.name === name);
    if (!found) throw new Error(`Unknown exploration action: ${name}`);
    return found;
  },
  find({ name }: { name: string }): ExplorationAction | undefined {
    return EXPLORATION.find((a) => a.name === name);
  },
  list(): ExplorationAction[] {
    return EXPLORATION;
  },
  findAll({
    classification,
  }: {
    classification: ManualClassification;
  }): ExplorationAction[] {
    return EXPLORATION.filter(
      (a) =>
        !a.classificationRestriction ||
        a.classificationRestriction.includes(classification),
    );
  },
};
