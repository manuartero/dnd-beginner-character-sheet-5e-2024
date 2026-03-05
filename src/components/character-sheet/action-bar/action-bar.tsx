import { CastSpellGrid, ChipGrid, Section } from "elements";
import { useMemo } from "react";
import { CLASS_ACTIONS, UNIVERSAL_ACTIONS } from "src/models/actions";
import { CLASS_DETAILS } from "src/models/classes";
import { groupSpellsByTiming } from "src/models/spell-timing";
import styles from "./action-bar.module.css";

import type { GridAction } from "elements";
import type { ActionTiming } from "src/models/actions";
import type { CharacterClass } from "src/models/classes";
import type { Spell } from "src/models/spells";

type ActionBarProps = {
  characterClass: CharacterClass;
  spells: Spell[];
};

const TIMING_LABELS: Record<ActionTiming, string> = {
  action: "Actions",
  "bonus-action": "Bonus Actions",
  reaction: "Reactions",
};

const TIMING_ORDER: ActionTiming[] = ["action", "bonus-action", "reaction"];

const CAST_SPELL_ICON = "combat.common.actions.cast-spell";
const CAST_SPELL_DESCRIPTION =
  "Cast one of your prepared spells using the appropriate casting time.";

export function ActionBar({ characterClass, spells }: ActionBarProps) {
  const classification = CLASS_DETAILS[characterClass].manualClassification;
  const isSpellcaster =
    classification === "spell-caster" || classification === "versatile";

  const spellsByTiming = useMemo(() => groupSpellsByTiming(spells), [spells]);

  const grouped = useMemo(() => {
    const availableActions = [
      ...UNIVERSAL_ACTIONS,
      ...CLASS_ACTIONS.filter((a) => {
        if (a.classRestriction && a.classRestriction !== characterClass)
          return false;
        if (
          a.classificationRestriction &&
          !a.classificationRestriction.includes(classification)
        )
          return false;
        return true;
      }),
    ];

    return TIMING_ORDER.map((timing) => {
      const baseActions: GridAction[] = availableActions
        .filter((a) => a.timing === timing)
        .map((a) => ({
          name: a.name,
          description: a.description,
          icon: a.icon,
        }));

      if (isSpellcaster) {
        const timingSpells = spellsByTiming[timing];
        const hasSpells = timingSpells.length > 0;

        baseActions.push({
          name: "Cast a Spell",
          description: CAST_SPELL_DESCRIPTION,
          icon: CAST_SPELL_ICON,
          disabled: !hasSpells,
          renderExpanded: hasSpells
            ? () => <CastSpellGrid spells={timingSpells} />
            : undefined,
        });
      }

      return {
        timing,
        label: TIMING_LABELS[timing],
        actions: baseActions,
      };
    });
  }, [characterClass, classification, isSpellcaster, spellsByTiming]);

  return (
    <Section title="Combat">
      <div className={styles.groupsContainer}>
        {grouped.map((group) => (
          <div key={group.timing}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            {group.actions.length > 0 ? (
              <ChipGrid actions={group.actions} />
            ) : (
              <div className={styles.emptyState}>Empty</div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
