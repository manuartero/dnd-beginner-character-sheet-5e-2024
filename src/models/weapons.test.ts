import {
  getWeaponByName,
  getWeaponsByProficiency,
  getWeaponsByRange,
  WEAPON_MASTERY,
  WEAPON_PROPERTIES,
  WEAPONS,
} from "./weapons";

describe("WEAPONS", () => {
  it("should contain 38 weapons", () => {
    expect(WEAPONS).toHaveLength(38);
  });
});

describe("WEAPON_PROPERTIES", () => {
  it("should contain 10 properties", () => {
    expect(Object.keys(WEAPON_PROPERTIES)).toHaveLength(10);
  });
});

describe("WEAPON_MASTERY", () => {
  it("should contain 8 masteries", () => {
    expect(Object.keys(WEAPON_MASTERY)).toHaveLength(8);
  });
});

describe("getWeaponsByProficiency()", () => {
  it("returns 14 simple weapons", () => {
    expect(getWeaponsByProficiency("simple")).toHaveLength(14);
  });

  it("returns 24 martial weapons", () => {
    expect(getWeaponsByProficiency("martial")).toHaveLength(24);
  });
});

describe("getWeaponsByRange()", () => {
  it("returns 28 melee weapons", () => {
    expect(getWeaponsByRange("melee")).toHaveLength(28);
  });

  it("returns 10 ranged weapons", () => {
    expect(getWeaponsByRange("ranged")).toHaveLength(10);
  });
});

describe("getWeaponByName()", () => {
  it("finds a weapon by exact name", () => {
    const weapon = getWeaponByName("Longsword");
    expect(weapon).toBeDefined();
    expect(weapon?.damage.dice).toBe("1d8");
    expect(weapon?.proficiency).toBe("martial");
    expect(weapon?.range).toBe("melee");
  });

  it("finds a weapon case-insensitively", () => {
    expect(getWeaponByName("longsword")).toBeDefined();
    expect(getWeaponByName("LONGSWORD")).toBeDefined();
  });

  it("returns undefined for unknown weapons", () => {
    expect(getWeaponByName("Lightsaber")).toBeUndefined();
  });
});
