import {
  computeArmorClass,
  computeHpMax,
  computeInitiative,
  computeSpellAttack,
} from "./character-stats";

import type { AbilityScores } from "./abilities";
import type { StatResult } from "./character-stats";
import type { Equipment } from "./equipment";

// --- computeHpMax ---

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

// --- computeArmorClass ---

type AcTestCase = {
  equipment: Equipment[];
  abilityScores: AbilityScores;
  expected: StatResult;
};

describe("computeArmorClass()", () => {
  const cases: AcTestCase[] = [
    {
      // light armor + shield: full DEX modifier applies
      equipment: [
        { type: "armor", name: "Leather Armor" },
        { type: "shield", name: "Shield" },
      ],
      abilityScores: { str: 10, dex: 14, con: 10, int: 10, wis: 10, cha: 10 },
      expected: {
        total: 15,
        lines: [
          { label: "Leather Armor", value: "11" },
          { label: "DEX modifier", value: "+2" },
          { label: "Shield", value: "+2" },
        ],
      },
    },
    {
      // heavy armor: DEX modifier is ignored
      equipment: [{ type: "armor", name: "Chain Mail" }],
      abilityScores: { str: 10, dex: 14, con: 10, int: 10, wis: 10, cha: 10 },
      expected: {
        total: 16,
        lines: [{ label: "Chain Mail", value: "16" }],
      },
    },
    {
      // medium armor: DEX modifier capped at +2
      equipment: [{ type: "armor", name: "Scale Mail" }],
      abilityScores: { str: 10, dex: 18, con: 10, int: 10, wis: 10, cha: 10 },
      expected: {
        total: 16,
        lines: [
          { label: "Scale Mail", value: "14" },
          { label: "DEX modifier (max +2)", value: "+2" },
        ],
      },
    },
    {
      // non-armor gear: treated as no armor
      equipment: [{ type: "gear", name: "Torch" }],
      abilityScores: { str: 10, dex: 14, con: 10, int: 10, wis: 10, cha: 10 },
      expected: {
        total: 12,
        lines: [
          { label: "No armor", value: "10" },
          { label: "DEX modifier", value: "+2" },
        ],
      },
    },
    {
      equipment: [],
      abilityScores: { str: 10, dex: 14, con: 10, int: 10, wis: 10, cha: 10 },
      expected: {
        total: 12,
        lines: [
          { label: "No armor", value: "10" },
          { label: "DEX modifier", value: "+2" },
        ],
      },
    },
  ];

  cases.forEach(({ equipment, abilityScores, expected }) => {
    it(`should compute AC for equipment: ${JSON.stringify(equipment)} and ability scores: ${JSON.stringify(
      abilityScores,
    )}`, () => {
      const result = computeArmorClass({ equipment, abilityScores });
      expect(result).toEqual(expected);
    });
  });
});

// --- computeInitiative ---

describe("computeInitiative()", () => {
  it("returns the DEX modifier as total", () => {
    const scores: AbilityScores = {
      str: 10,
      dex: 14,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    };
    expect(computeInitiative(scores)).toEqual({
      total: 2,
      lines: [{ label: "DEX modifier", value: "+2" }],
    });
  });

  it("handles negative DEX modifier", () => {
    const scores: AbilityScores = {
      str: 10,
      dex: 8,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    };
    expect(computeInitiative(scores)).toEqual({
      total: -1,
      lines: [{ label: "DEX modifier", value: "-1" }],
    });
  });
});

// --- computeSpellAttack ---

describe("computeSpellAttack()", () => {
  const scores: AbilityScores = {
    str: 10,
    dex: 10,
    con: 10,
    int: 16,
    wis: 14,
    cha: 12,
  };

  it("returns null for martial classes", () => {
    expect(
      computeSpellAttack({
        characterClass: "fighter",
        abilityScores: scores,
        proficiencyBonus: 2,
      }),
    ).toBeNull();
  });

  it("uses INT for wizard (modifier + proficiency)", () => {
    expect(
      computeSpellAttack({
        characterClass: "wizard",
        abilityScores: scores,
        proficiencyBonus: 2,
      }),
    ).toEqual({
      total: 5,
      lines: [
        { label: "INT modifier", value: "+3" },
        { label: "Proficiency bonus", value: "+2" },
      ],
    });
  });

  it("uses WIS for cleric", () => {
    expect(
      computeSpellAttack({
        characterClass: "cleric",
        abilityScores: scores,
        proficiencyBonus: 2,
      }),
    ).toEqual({
      total: 4,
      lines: [
        { label: "WIS modifier", value: "+2" },
        { label: "Proficiency bonus", value: "+2" },
      ],
    });
  });

  it("uses CHA for warlock", () => {
    expect(
      computeSpellAttack({
        characterClass: "warlock",
        abilityScores: scores,
        proficiencyBonus: 2,
      }),
    ).toEqual({
      total: 3,
      lines: [
        { label: "CHA modifier", value: "+1" },
        { label: "Proficiency bonus", value: "+2" },
      ],
    });
  });
});
