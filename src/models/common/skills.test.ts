import { computeSkillModifier, skills } from "./skills";

import type { AbilityName } from "./abilities";

describe("skills.findAll()", () => {
  [
    { ability: "str", expected: ["athletics"] },
    { ability: "dex", expected: ["acrobatics", "sleight-of-hand", "stealth"] },
    { ability: "con", expected: [] },
    {
      ability: "int",
      expected: ["arcana", "history", "investigation", "nature", "religion"],
    },
    {
      ability: "wis",
      expected: [
        "animal-handling",
        "insight",
        "medicine",
        "perception",
        "survival",
      ],
    },
    {
      ability: "cha",
      expected: ["deception", "intimidation", "performance", "persuasion"],
    },
  ].forEach(({ ability, expected }) => {
    it(`returns correct skills for ${ability}`, () => {
      const result = skills.findAll({ ability: ability as AbilityName });
      expect(result.map((s) => s.name)).toEqual(expected);
    });
  });
});

describe("skills.get()", () => {
  it("returns definition for a known skill", () => {
    expect(skills.get({ name: "athletics" }).label).toBe("Athletics");
    expect(skills.get({ name: "sleight-of-hand" }).label).toBe(
      "Sleight of Hand",
    );
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
