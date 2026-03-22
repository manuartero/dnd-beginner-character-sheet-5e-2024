import { describe, expect, it } from "vitest";
import { groupSpellsByTiming, spellCastingTiming } from "./spell-timing";

import type { Spell } from "./spells";

function makeSpell(overrides: Partial<Spell> = {}): Spell {
  return {
    id: "test-spell",
    name: "Test Spell",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 ft",
    components: "V, S",
    duration: "Instantaneous",
    concentration: false,
    ritual: false,
    description: "A test spell.",
    ...overrides,
  };
}

describe("spellCastingTiming", () => {
  it("returns 'action' for '1 action' casting time", () => {
    const spell = makeSpell({ castingTime: "1 action" });
    expect(spellCastingTiming(spell)).toBe("action");
  });

  it("returns 'bonus-action' for '1 bonus action' casting time", () => {
    const spell = makeSpell({ castingTime: "1 bonus action" });
    expect(spellCastingTiming(spell)).toBe("bonus-action");
  });

  it("returns 'reaction' for reaction casting times", () => {
    const shield = makeSpell({
      castingTime:
        "1 reaction, which you take when you are hit by an attack roll or targeted by the Magic Missile spell",
    });
    expect(spellCastingTiming(shield)).toBe("reaction");

    const featherFall = makeSpell({
      castingTime:
        "1 reaction, which you take when you or a creature within 60 feet of you falls",
    });
    expect(spellCastingTiming(featherFall)).toBe("reaction");
  });

  it("returns null for non-combat casting times", () => {
    expect(spellCastingTiming(makeSpell({ castingTime: "1 minute" }))).toBe(
      null,
    );
    expect(spellCastingTiming(makeSpell({ castingTime: "1 hour" }))).toBe(null);
    expect(spellCastingTiming(makeSpell({ castingTime: "10 minutes" }))).toBe(
      null,
    );
  });
});

describe("groupSpellsByTiming", () => {
  it("groups spells into the correct timing buckets", () => {
    const spells = [
      makeSpell({ id: "fire-bolt", castingTime: "1 action" }),
      makeSpell({ id: "shield", castingTime: "1 reaction, when hit" }),
      makeSpell({ id: "blade-ward", castingTime: "1 bonus action" }),
      makeSpell({ id: "alarm", castingTime: "1 minute" }),
    ];

    const groups = groupSpellsByTiming(spells);

    expect(groups.action).toHaveLength(1);
    expect(groups.action[0].id).toBe("fire-bolt");
    expect(groups["bonus-action"]).toHaveLength(1);
    expect(groups["bonus-action"][0].id).toBe("blade-ward");
    expect(groups.reaction).toHaveLength(1);
    expect(groups.reaction[0].id).toBe("shield");
  });

  it("excludes non-combat spells", () => {
    const spells = [
      makeSpell({ id: "alarm", castingTime: "1 minute" }),
      makeSpell({ id: "find-familiar", castingTime: "1 hour" }),
    ];

    const groups = groupSpellsByTiming(spells);

    expect(groups.action).toHaveLength(0);
    expect(groups["bonus-action"]).toHaveLength(0);
    expect(groups.reaction).toHaveLength(0);
  });

  it("returns empty arrays when given no spells", () => {
    const groups = groupSpellsByTiming([]);

    expect(groups.action).toHaveLength(0);
    expect(groups["bonus-action"]).toHaveLength(0);
    expect(groups.reaction).toHaveLength(0);
  });
});
