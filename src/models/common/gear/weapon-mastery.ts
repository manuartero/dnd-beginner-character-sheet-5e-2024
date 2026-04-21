import weaponMasteryData from "src/data/common/gear/weapon-mastery.json";

export type WeaponMasteryName =
  | "cleave"
  | "graze"
  | "nick"
  | "push"
  | "sap"
  | "slow"
  | "topple"
  | "vex";

export type WeaponMasteryDetails = {
  id: WeaponMasteryName;
  description: string;
};

const RAW = weaponMasteryData as Record<WeaponMasteryName, string>;
const DATA: WeaponMasteryDetails[] = Object.entries(RAW).map(
  ([id, description]) => ({ id: id as WeaponMasteryName, description }),
);
const BY_ID = new Map(DATA.map((m) => [m.id, m]));

export const weaponMastery = {
  get({ id }: { id: WeaponMasteryName }): WeaponMasteryDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon mastery: ${id}`);
    return found;
  },
  find({ id }: { id: string }): WeaponMasteryDetails | undefined {
    return BY_ID.get(id as WeaponMasteryName);
  },
  list(): WeaponMasteryDetails[] {
    return DATA;
  },
};
