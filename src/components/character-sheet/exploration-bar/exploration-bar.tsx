import { Fragment } from "react";
import { Section } from "src/components/section";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { EXPLORATION_ACTIONS } from "src/models/exploration-actions";
import { getIconPath } from "src/models/icons";
import styles from "./exploration-bar.module.css";

import type { ExplorationCategory } from "src/models/exploration-actions";
import type { IconName } from "src/models/icons";

const CATEGORY_LABELS: Record<ExplorationCategory, string> = {
  exploration: "Exploration",
  social: "Social",
};

const CATEGORY_ORDER: ExplorationCategory[] = ["exploration", "social"];

export function ExplorationBar() {
  const { expandedKey: expandedAction, toggle: toggleAction } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedAction);

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    actions: EXPLORATION_ACTIONS.filter((a) => a.category === category),
  }));

  return (
    <Section title="Exploration">
      <div className={styles.groupsContainer}>
        {grouped.map((group) => (
          <div key={group.category}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
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
                      <p className={styles.description}>{action.description}</p>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
