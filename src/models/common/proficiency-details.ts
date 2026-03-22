import proficiencyDetailsData from "src/data/common/proficiency-details.json";

import type { ProficiencyKey } from "src/models/class/classes";

export type ProficiencyDetails = {
  label: string;
  icon: string;
};

export const PROFICIENCY_DETAILS = proficiencyDetailsData as Record<
  ProficiencyKey,
  ProficiencyDetails
>;
