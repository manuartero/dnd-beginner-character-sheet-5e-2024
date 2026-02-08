import type { Action } from "./types";

export const UNIVERSAL_ACTIONS: Action[] = [
	{
		name: "Attack",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/icon-set-v2-combat-action-pixarts-store_48.png",
		description:
			"Make one melee or ranged attack with a weapon you are holding.",
	},
	{
		name: "Dash",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/icon-set-v2-combat-action-pixarts-store_36.png",
		description: "You gain extra movement equal to your speed for this turn.",
	},
	{
		name: "Dodge",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/icon-set-v2-combat-action-pixarts-store_37.png",
		description:
			"Until your next turn, any attack roll against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.",
	},
	{
		name: "Disengage",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/icon-set-v2-combat-action-pixarts-store_50.png",
		description:
			"Your movement does not provoke opportunity attacks for the rest of this turn.",
	},
	{
		name: "Help",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v5-divine-pixarts-store_82.png",
		description:
			"You give advantage to an ally's next ability check or attack roll against a target within 5 feet of you.",
	},
	{
		name: "Hide",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v4-rogue-pixarts-store_63.png",
		description:
			"Make a Dexterity (Stealth) check to try to become hidden from enemies.",
	},
	{
		name: "Opportunity Attack",
		timing: "reaction",
		icon: "/dnd-example-assets/BLACK/1x/icon-set-v2-combat-action-pixarts-store_56.png",
		description:
			"When a creature you can see moves out of your reach, you can use your reaction to make one melee attack against it.",
	},
];

export const CLASS_ACTIONS: Action[] = [
	{
		name: "Second Wind",
		timing: "bonus-action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v5-divine-pixarts-store_168.png",
		description:
			"Regain hit points equal to 1d10 + your Fighter level. Once per short or long rest.",
		classRestriction: "fighter",
	},
	{
		name: "Cunning Action: Dash",
		timing: "bonus-action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v4-rogue-pixarts-store_40.png",
		description: "You can Dash as a bonus action.",
		classRestriction: "rogue",
	},
	{
		name: "Cunning Action: Disengage",
		timing: "bonus-action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v4-rogue-pixarts-store_49.png",
		description: "You can Disengage as a bonus action.",
		classRestriction: "rogue",
	},
	{
		name: "Cunning Action: Hide",
		timing: "bonus-action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v4-rogue-pixarts-store_63.png",
		description: "You can Hide as a bonus action.",
		classRestriction: "rogue",
	},
	{
		name: "Sneak Attack",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v4-rogue-pixarts-store_38.png",
		description:
			"Once per turn, deal extra 1d6 damage when you hit with a finesse or ranged weapon and have advantage, or an ally is within 5 ft of the target.",
		classRestriction: "rogue",
	},
	{
		name: "Cast a Spell",
		timing: "action",
		icon: "/dnd-example-assets/BLACK/1x/game-icon-v7-magic-pixarts-store_173.png",
		description:
			"Cast one of your prepared spells using the appropriate casting time.",
		classRestriction: "wizard",
	},
];
