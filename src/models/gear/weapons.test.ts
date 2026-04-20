import { weaponMastery, weaponProperties, weapons } from "./weapons";

describe("weapons.list()", () => {
  it("contains 38 weapons", () => {
    expect(weapons.list()).toHaveLength(38);
  });
});

describe("weaponProperties.list()", () => {
  it("contains 10 properties", () => {
    expect(weaponProperties.list()).toHaveLength(10);
  });
});

describe("weaponMastery.list()", () => {
  it("contains 8 masteries", () => {
    expect(weaponMastery.list()).toHaveLength(8);
  });
});

describe("weapons.find({ id })", () => {
  it("finds a weapon by id", () => {
    const weapon = weapons.find({ id: "longsword" });
    expect(weapon).toBeDefined();
    expect(weapon?.name).toBe("Longsword");
  });

  it("returns undefined for unknown id", () => {
    expect(weapons.find({ id: "lightsaber" })).toBeUndefined();
  });
});

describe("weapons.find({ name })", () => {
  it("finds a weapon by exact name", () => {
    const weapon = weapons.find({ name: "Longsword" });
    expect(weapon).toBeDefined();
    expect(weapon?.damage.dice).toBe("1d8");
    expect(weapon?.proficiency).toBe("martial");
    expect(weapon?.range).toBe("melee");
  });

  it("finds a weapon case-insensitively", () => {
    expect(weapons.find({ name: "longsword" })).toBeDefined();
    expect(weapons.find({ name: "LONGSWORD" })).toBeDefined();
  });

  it("returns undefined for unknown weapons", () => {
    expect(weapons.find({ name: "Lightsaber" })).toBeUndefined();
  });
});
