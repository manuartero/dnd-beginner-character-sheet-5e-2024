import { weaponProperties } from "./weapon-properties";

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
