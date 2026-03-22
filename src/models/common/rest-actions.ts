import restActionsData from "src/data/common/rest-actions.json";

import type { RestType } from "src/models/class/class-resources";

export type RestAction = {
  id: RestType;
  label: string;
  icon: string;
  description: string;
};

export const REST_ACTIONS: RestAction[] = restActionsData as RestAction[];
