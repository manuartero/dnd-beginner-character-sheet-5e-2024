import type { ActionTiming } from "src/models/actions";
import type { Spell } from "src/models/spells";

/** Map a spell's castingTime string to an ActionTiming, or null if not combat-castable. */
function spellCastingTiming(spell: Spell): ActionTiming | null {
  const ct = spell.castingTime.toLowerCase();
  if (ct === "1 action") return "action";
  if (ct === "1 bonus action") return "bonus-action";
  if (ct.startsWith("1 reaction")) return "reaction";
  return null;
}

/** Group spells by their combat action timing. Only includes spells castable in combat. */
function groupSpellsByTiming(spells: Spell[]): Record<ActionTiming, Spell[]> {
  const groups: Record<ActionTiming, Spell[]> = {
    action: [],
    "bonus-action": [],
    reaction: [],
  };
  for (const spell of spells) {
    const timing = spellCastingTiming(spell);
    if (timing) {
      groups[timing].push(spell);
    }
  }
  return groups;
}

export { groupSpellsByTiming, spellCastingTiming };
