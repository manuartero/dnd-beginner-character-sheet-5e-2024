import { CLASS_ACTIONS, UNIVERSAL_ACTIONS } from "src/data/actions";
import type { IconName } from "src/data/icons";
import { getIconPath } from "src/data/icons";
import type { Action, ActionTiming, CharacterClass } from "src/data/types";
import { useExpandable } from "src/hooks/use-expandable";
import styles from "./action-bar.module.css";

interface ActionBarProps {
  characterClass: CharacterClass;
}

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
    <div className="section">
      <h2 className="section-title">Combat</h2>
      <div className={styles.groupsContainer}>
        {grouped.map((group) => (
          <div key={group.timing}>
            <h3 className="group-label">
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

interface ActionButtonProps {
  action: Action;
  isExpanded: boolean;
  onToggle: () => void;
}

function ActionButton({ action, isExpanded, onToggle }: ActionButtonProps) {
  return (
    <div className={styles.actionWrapper}>
      <button type="button" onClick={onToggle} className={styles.actionButton}>
        {action.icon && (
          <img
            src={getIconPath(action.icon as IconName)}
            alt={action.name}
            className="icon icon--lg"
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
