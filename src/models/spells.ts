import type { Spell } from "src/models/types";

export const WIZARD_CANTRIPS: Spell[] = [
  {
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 ft",
    components: "V, S",
    duration: "Instantaneous",
    description:
      "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack. On a hit, the target takes 1d10 fire damage.",
    damage: { dice: "1d10", type: "fire" },
  },
  {
    name: "Ray of Frost",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 ft",
    components: "V, S",
    duration: "Instantaneous",
    description:
      "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.",
    damage: { dice: "1d8", type: "cold" },
  },
  {
    name: "Mage Hand",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "30 ft",
    components: "V, S",
    duration: "1 minute",
    description:
      "A spectral, floating hand appears at a point you choose within range. You can use the hand to manipulate objects, open unlocked doors, or pour out a vial.",
  },
  {
    name: "Light",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, M",
    duration: "1 hour",
    description:
      "You touch one object that is no larger than 10 feet in any dimension. It sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
  },
];

export const WIZARD_SPELLS_LEVEL_1: Spell[] = [
  {
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 ft",
    components: "V, S",
    duration: "Instantaneous",
    description:
      "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. Each dart deals 1d4 + 1 force damage. The darts all strike simultaneously.",
    damage: { dice: "3x(1d4+1)", type: "force" },
  },
  {
    name: "Shield",
    level: 1,
    school: "Abjuration",
    castingTime: "1 reaction",
    range: "Self",
    components: "V, S",
    duration: "1 round",
    description:
      "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack.",
  },
  {
    name: "Burning Hands",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Self (15-ft cone)",
    components: "V, S",
    duration: "Instantaneous",
    description:
      "Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much on a successful one.",
    damage: { dice: "3d6", type: "fire" },
  },
  {
    name: "Thunderwave",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Self (15-ft cube)",
    components: "V, S",
    duration: "Instantaneous",
    description:
      "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away. On a success, half damage and not pushed.",
    damage: { dice: "2d8", type: "thunder" },
  },
  {
    name: "Detect Magic",
    level: 1,
    school: "Divination",
    castingTime: "1 action",
    range: "Self (30-ft radius)",
    components: "V, S",
    duration: "Concentration, up to 10 minutes",
    description:
      "For the duration, you sense the presence of magic within 30 feet of you. You can also see a faint aura around any visible creature or object that bears magic.",
  },
];
