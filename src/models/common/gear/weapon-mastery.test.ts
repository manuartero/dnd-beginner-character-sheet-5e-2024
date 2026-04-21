import { weaponMastery } from "./weapon-mastery";

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
