import explorationActionsData from "src/data/common/exploration-actions.json";

import type { ManualClassification } from "src/models/class/classes";

export type ExplorationCategory = "exploration" | "social";

export type ExplorationAction = {
  name: string;
  category: ExplorationCategory;
  icon?: string;
  description: string;
  classificationRestriction?: ManualClassification[];
};

export const EXPLORATION_ACTIONS: ExplorationAction[] =
  explorationActionsData as ExplorationAction[];
