import restActionsData from "src/data/common/rest-actions.json";

import type { RestType } from "src/models/class/class-resources";

export type RestAction = {
  id: RestType;
  label: string;
  icon: string;
  description: string;
};

const DATA = restActionsData as RestAction[];

export const restActions = {
  get({ id }: { id: RestType }): RestAction {
    const found = DATA.find((a) => a.id === id);
    if (!found) throw new Error(`Unknown rest action: ${id}`);
    return found;
  },
  list(): RestAction[] {
    return DATA;
  },
};
