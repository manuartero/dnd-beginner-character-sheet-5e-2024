import restActionsData from "src/data/rest-actions.json";

import type { RestType } from "./class-resources";

export type RestAction = {
  id: RestType;
  label: string;
  icon: string;
  description: string;
};

export const REST_ACTIONS: RestAction[] = restActionsData as RestAction[];
