import actionsData from "src/data/common/actions.json";

export type ActionTiming = "action" | "bonus-action" | "reaction";

export type CombatAction = {
  name: string;
  timing: ActionTiming;
  icon?: string;
  description: string;
};

const DATA = actionsData.combat as CombatAction[];

export const combatActions = {
  get({ name }: { name: string }): CombatAction {
    const found = DATA.find((a) => a.name === name);
    if (!found) throw new Error(`Unknown combat action: ${name}`);
    return found;
  },
  find({ name }: { name: string }): CombatAction | undefined {
    return DATA.find((a) => a.name === name);
  },
  list(): CombatAction[] {
    return DATA;
  },
};
