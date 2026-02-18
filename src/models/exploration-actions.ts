import explorationActionsData from "src/data/exploration-actions.json";

export type ExplorationCategory = "exploration" | "social";

export type ExplorationAction = {
  name: string;
  category: ExplorationCategory;
  icon?: string;
  description: string;
};

export const EXPLORATION_ACTIONS: ExplorationAction[] =
  explorationActionsData as ExplorationAction[];
