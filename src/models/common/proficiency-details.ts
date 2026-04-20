import proficiencyDetailsData from "src/data/common/proficiency-details.json";

import type { ProficiencyKey } from "src/models/class/classes";

export type ProficiencyDetails = {
  id: ProficiencyKey;
  label: string;
  icon: string;
};

const RAW = proficiencyDetailsData as Record<
  ProficiencyKey,
  Omit<ProficiencyDetails, "id">
>;
const DATA: ProficiencyDetails[] = Object.entries(RAW).map(([id, v]) => ({
  id: id as ProficiencyKey,
  ...v,
}));
const BY_ID = new Map(DATA.map((d) => [d.id, d]));

export const proficiencyDetails = {
  get({ id }: { id: ProficiencyKey }): ProficiencyDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown proficiency: ${id}`);
    return found;
  },
  list(): ProficiencyDetails[] {
    return DATA;
  },
};
