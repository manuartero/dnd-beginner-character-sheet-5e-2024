import proficiencyDetailsData from "src/data/common/proficiency-details.json";

import type { ProficiencyKey } from "src/models/class/classes";

export type ProficiencyDetails = {
  label: string;
  icon: string;
};

const DATA = proficiencyDetailsData as Record<
  ProficiencyKey,
  ProficiencyDetails
>;

export const proficiencyDetails = {
  get(id: ProficiencyKey): ProficiencyDetails {
    return DATA[id];
  },
  list(): { id: ProficiencyKey; details: ProficiencyDetails }[] {
    return Object.entries(DATA).map(([id, details]) => ({
      id: id as ProficiencyKey,
      details,
    }));
  },
};
