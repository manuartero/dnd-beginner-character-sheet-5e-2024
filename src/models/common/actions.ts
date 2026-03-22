import classActionsData from "src/data/class/class-actions.json";
import universalActionsData from "src/data/common/universal-actions.json";

import type {
  CharacterClass,
  ManualClassification,
} from "src/models/class/classes";

export type ActionTiming = "action" | "bonus-action" | "reaction";

export type Action = {
  name: string;
  timing: ActionTiming;
  icon?: string;
  description: string;
  classRestriction?: CharacterClass;
  classificationRestriction?: ManualClassification[];
};

export const UNIVERSAL_ACTIONS: Action[] = universalActionsData as Action[];

export const CLASS_ACTIONS: Action[] = classActionsData as Action[];
