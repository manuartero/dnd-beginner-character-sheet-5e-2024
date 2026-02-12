import { useExpandable } from "src/hooks/use-expandable";
import type { Action, ActionTiming } from "src/models/actions";
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

  const availableActions = [
    ...UNIVERSAL_ACTIONS,
    ...CLASS_ACTIONS.filter(
      (a) => !a.classRestriction || a.classRestriction === characterClass,
    ),
  ];

  const grouped = TIMING_ORDER.map((timing) => ({
    timing,
    label: TIMING_LABELS[timing],
    actions: availableActions.filter((a) => a.timing === timing),
  }));

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Combat</h2>
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
                  <ActionButton
                    key={action.name}
                    action={action}
                    isExpanded={expandedAction === action.name}
                    onToggle={() => toggleAction(action.name)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>Empty</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type ActionButtonProps = {
  action: Action;
  isExpanded: boolean;
  onToggle: () => void;
};

function ActionButton({ action, isExpanded, onToggle }: ActionButtonProps) {
  return (
    <div className={styles.actionWrapper}>
      <button type="button" onClick={onToggle} className={styles.actionButton}>
        {action.icon && (
          <img
            src={getIconPath(action.icon as IconName)}
            alt={action.name}
            className={styles.icon}
          />
        )}
        <span className={styles.actionLabel}>{action.name}</span>
      </button>
      {isExpanded && (
        <div className={styles.description}>{action.description}</div>
      )}
    </div>
  );
}
