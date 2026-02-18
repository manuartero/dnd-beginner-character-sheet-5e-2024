import { Fragment, useMemo } from "react";
import { Section } from "src/components/section";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import type { ActionTiming } from "src/models/actions";
import { CLASS_ACTIONS, UNIVERSAL_ACTIONS } from "src/models/actions";
import type { CharacterClass } from "src/models/classes";
import type { IconName } from "src/models/icons";
import { getIconPath } from "src/models/icons";
import styles from "./action-bar.module.css";

type ActionBarProps = {
  characterClass: CharacterClass;
};

const TIMING_LABELS: Record<ActionTiming, string> = {
  action: "Actions",
  "bonus-action": "Bonus Actions",
  reaction: "Reactions",
};

const TIMING_SYMBOL_CLASS: Record<ActionTiming, string> = {
  action: styles.timingSymbol_action,
  "bonus-action": styles.timingSymbol_bonusAction,
  reaction: styles.timingSymbol_reaction,
};

const TIMING_ORDER: ActionTiming[] = ["action", "bonus-action", "reaction"];

export function ActionBar({ characterClass }: ActionBarProps) {
  const { expandedKey: expandedAction, toggle: toggleAction } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedAction);

  const grouped = useMemo(() => {
    const availableActions = [
      ...UNIVERSAL_ACTIONS,
      ...CLASS_ACTIONS.filter(
        (a) => !a.classRestriction || a.classRestriction === characterClass,
      ),
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
            <h3 className={styles.groupLabel}>
              {group.label}
              <span className={TIMING_SYMBOL_CLASS[group.timing]} />
            </h3>
            {group.actions.length > 0 ? (
              <div className={styles.actionsGrid}>
                {group.actions.map((action) => (
                  <Fragment key={action.name}>
                    <button
                      ref={(el) => {
                        if (el) buttonRefs.current.set(action.name, el);
                        else buttonRefs.current.delete(action.name);
                      }}
                      type="button"
                      aria-expanded={expandedAction === action.name}
                      onClick={() => toggleAction(action.name)}
                      className={`${styles.actionButton}${expandedAction === action.name ? ` ${styles.highlighted}` : ""}`}
                    >
                      {action.icon && (
                        <img
                          src={getIconPath(action.icon as IconName)}
                          alt={action.name}
                          className={styles.icon}
                        />
                      )}
                      <span className={styles.actionLabel}>{action.name}</span>
                    </button>
                    {expandedAction === action.name && (
                      <div className={styles.descriptionRow}>
                        <span
                          className={styles.descriptionArrow}
                          style={{ left: `${arrowOffset}px` }}
                        />
                        <p className={styles.description}>
                          {action.description}
                        </p>
                      </div>
                    )}
                  </Fragment>
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
