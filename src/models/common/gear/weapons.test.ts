import { weaponMastery, weaponProperties, weapons } from "./weapons";

describe("weapons.get()", () => {
  it("returns a weapon by id", () => {
    expect(weapons.get({ id: "longsword" }).name).toBe("Longsword");
  });

  it("returns a weapon by name (case-insensitive)", () => {
    expect(weapons.get({ name: "LONGSWORD" }).id).toBe("longsword");
  });

  it("throws on unknown id", () => {
    expect(() => weapons.get({ id: "lightsaber" })).toThrow(/Unknown weapon/);
  });

  it("throws on unknown name", () => {
    expect(() => weapons.get({ name: "Lightsaber" })).toThrow(/Unknown weapon/);
  });
});

describe("weapons.find()", () => {
  it("finds a weapon by id", () => {
    const weapon = weapons.find({ id: "longsword" });
    expect(weapon?.name).toBe("Longsword");
  });

  it("finds a weapon by exact name", () => {
    const weapon = weapons.find({ name: "Longsword" });
    expect(weapon?.damage.dice).toBe("1d8");
    expect(weapon?.proficiency).toBe("martial");
    expect(weapon?.range).toBe("melee");
  });

  it("finds a weapon case-insensitively by name", () => {
    expect(weapons.find({ name: "longsword" })).toBeDefined();
    expect(weapons.find({ name: "LONGSWORD" })).toBeDefined();
  });

  it("returns undefined for unknown id", () => {
    expect(weapons.find({ id: "lightsaber" })).toBeUndefined();
  });

  it("returns undefined for unknown name", () => {
    expect(weapons.find({ name: "Lightsaber" })).toBeUndefined();
  });
});

describe("weapons.list()", () => {
  it("contains 38 weapons", () => {
    expect(weapons.list()).toHaveLength(38);
  });
});

describe("weaponProperties.get()", () => {
  it("returns a property by id", () => {
    expect(weaponProperties.get({ id: "finesse" }).description).toBeTruthy();
  });

  it("throws on unknown id", () => {
    expect(() => weaponProperties.get({ id: "glowing" })).toThrow(
      /Unknown weapon property/,
    );
  });
});

describe("weaponProperties.find()", () => {
  it("returns a property by id", () => {
    expect(weaponProperties.find({ id: "finesse" })).toBeDefined();
  });

  it("returns undefined for unknown id", () => {
    expect(weaponProperties.find({ id: "glowing" })).toBeUndefined();
  });
});

describe("weaponProperties.list()", () => {
  it("contains 10 properties", () => {
    expect(weaponProperties.list()).toHaveLength(10);
  });
});

describe("weaponMastery.get()", () => {
  it("returns a mastery by id", () => {
    expect(weaponMastery.get({ id: "cleave" }).description).toBeTruthy();
  });

  it("throws on unknown id", () => {
    expect(() =>
      weaponMastery.get({ id: "flurry" as unknown as "cleave" }),
    ).toThrow(/Unknown weapon mastery/);
  });
});

describe("weaponMastery.find()", () => {
  it("returns a mastery by id", () => {
    expect(weaponMastery.find({ id: "cleave" })).toBeDefined();
  });

  it("returns undefined for unknown id", () => {
    expect(weaponMastery.find({ id: "flurry" })).toBeUndefined();
  });
});

describe("weaponMastery.list()", () => {
  it("contains 8 masteries", () => {
    expect(weaponMastery.list()).toHaveLength(8);
  });
});
