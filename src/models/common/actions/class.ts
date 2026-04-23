import actionsData from "src/data/common/actions.json";

import type {
  CharacterClass,
  ManualClassification,
} from "src/models/class/classes";
import type { CombatAction } from "./combat";

export type ClassAction = CombatAction & {
  classRestriction?: CharacterClass;
  classificationRestriction?: ManualClassification[];
};

const DATA = actionsData.class as ClassAction[];

export const classActions = {
  get({ name }: { name: string }): ClassAction {
    const found = DATA.find((a) => a.name === name);
    if (!found) throw new Error(`Unknown class action: ${name}`);
    return found;
  },
  find({ name }: { name: string }): ClassAction | undefined {
    return DATA.find((a) => a.name === name);
  },
  list(): ClassAction[] {
    return DATA;
  },
  findAll({
    cls,
    classification,
  }: {
    cls: CharacterClass;
    classification: ManualClassification;
  }): ClassAction[] {
    return DATA.filter((a) => {
      if (a.classRestriction && a.classRestriction !== cls) return false;
      if (
        a.classificationRestriction &&
        !a.classificationRestriction.includes(classification)
      )
        return false;
      return true;
    });
  },
};
