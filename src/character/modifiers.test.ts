import {
  computeModifier,
  computeProficiencyBonus,
  computeSkillModifier,
  formatModifier,
} from "./modifiers";

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

describe("computeSkillModifier()", () => {
  it("returns ability modifier when not proficient", () => {
    expect(
      computeSkillModifier({
        abilityModifier: 2,
        proficiencyBonus: 3,
        isProficient: false,
      }),
    ).toBe(2);
  });

  it("returns ability modifier + proficiency bonus when proficient", () => {
    expect(
      computeSkillModifier({
        abilityModifier: 2,
        proficiencyBonus: 3,
        isProficient: true,
      }),
    ).toBe(5);
  });

  it("handles negative ability modifiers", () => {
    expect(
      computeSkillModifier({
        abilityModifier: -1,
        proficiencyBonus: 3,
        isProficient: true,
      }),
    ).toBe(2);
    expect(
      computeSkillModifier({
        abilityModifier: -1,
        proficiencyBonus: 3,
        isProficient: false,
      }),
    ).toBe(-1);
  });
});
