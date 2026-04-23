import actionsData from "src/data/common/actions.json";

import type { ManualClassification } from "src/models/class/classes";

export type ExplorationCategory = "exploration" | "social";

export type ExplorationAction = {
  name: string;
  category: ExplorationCategory;
  icon?: string;
  description: string;
  classificationRestriction?: ManualClassification[];
};

const DATA = actionsData.exploration as ExplorationAction[];

export const explorationActions = {
  get({ name }: { name: string }): ExplorationAction {
    const found = DATA.find((a) => a.name === name);
    if (!found) throw new Error(`Unknown exploration action: ${name}`);
    return found;
  },
  find({ name }: { name: string }): ExplorationAction | undefined {
    return DATA.find((a) => a.name === name);
  },
  list(): ExplorationAction[] {
    return DATA;
  },
  findAll({
    classification,
  }: {
    classification: ManualClassification;
  }): ExplorationAction[] {
    return DATA.filter(
      (a) =>
        !a.classificationRestriction ||
        a.classificationRestriction.includes(classification),
    );
  },
};
