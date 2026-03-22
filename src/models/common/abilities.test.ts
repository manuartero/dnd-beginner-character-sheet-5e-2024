import { computeModifier } from "./abilities";

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
