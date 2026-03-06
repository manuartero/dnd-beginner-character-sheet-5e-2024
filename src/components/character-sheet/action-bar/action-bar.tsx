import { ChipGrid, EmptySlot, labelStyles, Section } from "elements";
import { useMemo } from "react";
import { CastSpellGrid } from "src/components/cast-spell-grid/cast-spell-grid";
import { CLASS_ACTIONS, UNIVERSAL_ACTIONS } from "src/models/actions";
import { CLASS_DETAILS } from "src/models/classes";
import { getIconPath } from "src/models/icons";
import { groupSpellsByTiming } from "src/models/spell-timing";
import styles from "./action-bar.module.css";

import type { GridAction } from "elements";
import type { ActionTiming } from "src/models/actions";
import type { CharacterClass } from "src/models/classes";
import type { IconName } from "src/models/icons";
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

const CAST_SPELL_ICON = getIconPath("combat.common.actions.cast-spell");
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
          key: a.name,
          label: a.name,
          description: a.description,
          icon: a.icon ? getIconPath(a.icon as IconName) : undefined,
        }));

      if (isSpellcaster) {
        const timingSpells = spellsByTiming[timing];
        const hasSpells = timingSpells.length > 0;

        baseActions.push({
          key: "Cast a Spell",
          label: "Cast a Spell",
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
            <h3 className={labelStyles.groupLabel}>{group.label}</h3>
            {group.actions.length > 0 ? (
              <ChipGrid actions={group.actions} />
            ) : (
              <EmptySlot label="Empty" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
