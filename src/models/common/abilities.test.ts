import {
  abilities,
  computeModifier,
  computeProficiencyBonus,
  formatModifier,
} from "./abilities";

describe("abilities.get()", () => {
  it("returns details for a known ability", () => {
    expect(abilities.get({ id: "str" })).toEqual({
      id: "str",
      label: "Strength",
      short: "STR",
    });
  });

  it("throws on unknown ability", () => {
    expect(() => abilities.get({ id: "luck" as unknown as "str" })).toThrow(
      /Unknown ability/,
    );
  });
});

describe("abilities.list()", () => {
  it("returns all six abilities in canonical order", () => {
    expect(abilities.list().map((a) => a.id)).toEqual([
      "str",
      "dex",
      "con",
      "int",
      "wis",
      "cha",
    ]);
  });
});

describe("computeModifier()", () => {
  [
    { score: 10, expected: 0 },
    { score: 12, expected: 1 },
    { score: 8, expected: -1 },
    { score: 18, expected: 4 },
    { score: 3, expected: -4 },
  ].forEach(({ score, expected }) => {
    it(`should return ${expected} for a score of ${score}`, () => {
      expect(computeModifier(score)).toBe(expected);
    });
  });
});

describe("computeProficiencyBonus()", () => {
  [
    { level: 1, expected: 2 },
    { level: 4, expected: 2 },
    { level: 5, expected: 3 },
    { level: 8, expected: 3 },
    { level: 9, expected: 4 },
    { level: 13, expected: 5 },
    { level: 17, expected: 6 },
  ].forEach(({ level, expected }) => {
    it(`returns +${expected} at level ${level}`, () => {
      expect(computeProficiencyBonus(level)).toBe(expected);
    });
  });
});

describe("formatModifier()", () => {
  it("prefixes positive values with +", () => {
    expect(formatModifier(3)).toBe("+3");
  });

  it("renders zero as +0", () => {
    expect(formatModifier(0)).toBe("+0");
  });

  it("keeps native sign for negative values", () => {
    expect(formatModifier(-2)).toBe("-2");
  });
});
