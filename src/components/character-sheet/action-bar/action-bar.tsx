import { useMemo } from "react";
import { ActionButton } from "src/components/action-button/action-button";
import { Section } from "src/components/section";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { CLASS_ACTIONS, UNIVERSAL_ACTIONS } from "src/models/actions";
import { CLASS_DETAILS } from "src/models/classes";
import styles from "./action-bar.module.css";

import type { ActionTiming } from "src/models/actions";
import type { CharacterClass } from "src/models/classes";

type ActionBarProps = {
  characterClass: CharacterClass;
};

const TIMING_LABELS: Record<ActionTiming, string> = {
  action: "Actions",
  "bonus-action": "Bonus Actions",
  reaction: "Reactions",
};

const TIMING_ORDER: ActionTiming[] = ["action", "bonus-action", "reaction"];

export function ActionBar({ characterClass }: ActionBarProps) {
  const { expandedKey: expandedAction, toggle: toggleAction } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedAction);

  const grouped = useMemo(() => {
    const classification = CLASS_DETAILS[characterClass].manualClassification;
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
    return TIMING_ORDER.map((timing) => ({
      timing,
      label: TIMING_LABELS[timing],
      actions: availableActions.filter((a) => a.timing === timing),
    }));
  }, [characterClass]);

  return (
    <Section title="Combat">
      <div className={styles.groupsContainer}>
        {grouped.map((group) => (
          <div key={group.timing}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            {group.actions.length > 0 ? (
              <div className={styles.actionsGrid}>
                {group.actions.map((action) => (
                  <ActionButton
                    key={action.name}
                    name={action.name}
                    description={action.description}
                    icon={action.icon}
                    isExpanded={expandedAction === action.name}
                    arrowOffset={arrowOffset}
                    buttonRef={(el) => {
                      if (el) buttonRefs.current.set(action.name, el);
                      else buttonRefs.current.delete(action.name);
                    }}
                    onClick={() => toggleAction(action.name)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>Empty</div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
