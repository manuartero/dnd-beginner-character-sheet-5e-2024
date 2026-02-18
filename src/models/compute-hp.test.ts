import { computeHpMax } from "./compute-hp";

describe("computeHpMax()", () => {
  it("computes HP for a d12 with 12 CON (modifier +1)", () => {
    expect(computeHpMax({ characterClass: "barbarian", conScore: 12 })).toBe(
      13,
    );
  });

  it("computes HP for a d12 with 8 CON (modifier -1)", () => {
    expect(computeHpMax({ characterClass: "barbarian", conScore: 8 })).toBe(11);
  });

  it("computes HP for a d10 with 10 CON (modifier 0)", () => {
    expect(computeHpMax({ characterClass: "fighter", conScore: 10 })).toBe(10);
  });

  it("computes HP for a d10 with 14 CON (modifier +2)", () => {
    expect(computeHpMax({ characterClass: "fighter", conScore: 14 })).toBe(12);
  });

  it("computes HP for a d6 with 10 CON (modifier 0)", () => {
    expect(computeHpMax({ characterClass: "wizard", conScore: 10 })).toBe(6);
  });

  it("computes HP for a d6 with 8 CON (modifier -1)", () => {
    expect(computeHpMax({ characterClass: "wizard", conScore: 8 })).toBe(5);
  });

  it("returns at least 1 HP even with very low CON", () => {
    expect(computeHpMax({ characterClass: "wizard", conScore: 1 })).toBe(1);
  });
});
