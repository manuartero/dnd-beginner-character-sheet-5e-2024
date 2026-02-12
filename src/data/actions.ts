import classActionsData from "../../public/data/class-actions.json";
import universalActionsData from "../../public/data/universal-actions.json";
import type { CharacterClass } from "./classes";

export type ActionTiming = "action" | "bonus-action" | "reaction";

export type Action = {
  name: string;
  timing: ActionTiming;
  icon?: string;
  description: string;
  classRestriction?: CharacterClass;
};

export const UNIVERSAL_ACTIONS: Action[] = universalActionsData as Action[];

export const CLASS_ACTIONS: Action[] = classActionsData as Action[];
