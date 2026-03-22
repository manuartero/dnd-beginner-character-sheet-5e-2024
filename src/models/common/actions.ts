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

export const COMBAT_ACTIONS: CombatAction[] =
  actionsData.combat as CombatAction[];

export const CLASS_ACTIONS: ClassAction[] = actionsData.class as ClassAction[];

export const EXPLORATION_ACTIONS: ExplorationAction[] =
  actionsData.exploration as ExplorationAction[];
