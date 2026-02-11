import { computeSkillModifier, skillsForAbility } from "./skills";

describe("skillsForAbility()", () => {
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
			const skills = skillsForAbility(ability as any);
			expect(skills.map((s) => s.name)).toEqual(expected);
		});
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
