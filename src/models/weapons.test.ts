import {
  getWeaponById,
  getWeaponByName,
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

describe("getWeaponById()", () => {
  it("finds a weapon by id", () => {
    const weapon = getWeaponById("longsword");
    expect(weapon).toBeDefined();
    expect(weapon?.name).toBe("Longsword");
  });

  it("returns undefined for unknown id", () => {
    expect(getWeaponById("lightsaber")).toBeUndefined();
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
