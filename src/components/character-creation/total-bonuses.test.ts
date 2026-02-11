import { totalBonuses } from "./total-bonuses";

describe("totalBonuses()", () => {
  it("sums up the total bonuses", () => {
    const bonuses = { str: 1, dex: 0, con: 2, int: undefined, wis: -1 };
    expect(totalBonuses(bonuses)).toBe(2); // 1 + 0 + 2 + 0 (undefined treated as 0) - 1 = 2
  });
});
