import type { CharacterClass } from "./classes";

export type ActionTiming = "action" | "bonus-action" | "reaction";

export type Action = {
  name: string;
  timing: ActionTiming;
  icon?: string;
  description: string;
  classRestriction?: CharacterClass;
};

export const UNIVERSAL_ACTIONS: Action[] = [
  {
    name: "Attack",
    timing: "action",
    icon: "combat.common.actions.attack",
    description:
      "Make one melee or ranged attack with a weapon you are holding.",
  },
  {
    name: "Dash",
    timing: "action",
    icon: "combat.common.actions.dash",
    description: "You gain extra movement equal to your speed for this turn.",
  },
  {
    name: "Dodge",
    timing: "action",
    icon: "combat.common.actions.dodge",
    description:
      "Until your next turn, any attack roll against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.",
  },
  {
    name: "Disengage",
    timing: "action",
    icon: "combat.common.actions.disengage",
    description:
      "Your movement does not provoke opportunity attacks for the rest of this turn.",
  },
  {
    name: "Help",
    timing: "action",
    icon: "combat.common.actions.help",
    description:
      "You give advantage to an ally's next ability check or attack roll against a target within 5 feet of you.",
  },
  {
    name: "Hide",
    timing: "action",
    icon: "combat.common.actions.hide",
    description:
      "Make a Dexterity (Stealth) check to try to become hidden from enemies.",
  },
  {
    name: "Opportunity Attack",
    timing: "reaction",
    icon: "combat.common.reactions.opportunity-attack",
    description:
      "When a creature you can see moves out of your reach, you can use your reaction to make one melee attack against it.",
  },
];

export const CLASS_ACTIONS: Action[] = [
  {
    name: "Second Wind",
    timing: "bonus-action",
    description:
      "Regain hit points equal to 1d10 + your Fighter level. Once per short or long rest.",
    classRestriction: "fighter",
  },
  {
    name: "Cunning Action: Dash",
    timing: "bonus-action",
    description: "You can Dash as a bonus action.",
    classRestriction: "rogue",
  },
  {
    name: "Cunning Action: Disengage",
    timing: "bonus-action",
    description: "You can Disengage as a bonus action.",
    classRestriction: "rogue",
  },
  {
    name: "Cunning Action: Hide",
    timing: "bonus-action",
    description: "You can Hide as a bonus action.",
    classRestriction: "rogue",
  },
  {
    name: "Sneak Attack",
    timing: "action",
    description:
      "Once per turn, deal extra 1d6 damage when you hit with a finesse or ranged weapon and have advantage, or an ally is within 5 ft of the target.",
    classRestriction: "rogue",
  },
  {
    name: "Cast a Spell",
    timing: "action",
    description:
      "Cast one of your prepared spells using the appropriate casting time.",
    classRestriction: "wizard",
  },
];
