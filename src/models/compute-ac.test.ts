import { computeArmorClass } from "./compute-ac";

import type { AbilityScores } from "./abilities";
import type { AcResult } from "./compute-ac";
import type { Equipment } from "./equipment";

type TestCase = {
  equipment: Equipment[];
  abilityScores: AbilityScores;
  expected: AcResult;
};

describe("computeArmorClass()", () => {
  const cases: TestCase[] = [
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
