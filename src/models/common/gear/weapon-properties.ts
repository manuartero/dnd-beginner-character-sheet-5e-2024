import weaponPropertiesData from "src/data/common/gear/weapon-properties.json";

export type WeaponProperty = {
  id: string;
  description: string;
};

const RAW = weaponPropertiesData as Record<string, string>;
const DATA: WeaponProperty[] = Object.entries(RAW).map(([id, description]) => ({
  id,
  description,
}));
const BY_ID = new Map(DATA.map((p) => [p.id, p]));

export const weaponProperties = {
  get({ id }: { id: string }): WeaponProperty {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon property: ${id}`);
    return found;
  },
  find({ id }: { id: string }): WeaponProperty | undefined {
    return BY_ID.get(id);
  },
  list(): WeaponProperty[] {
    return DATA;
  },
};
