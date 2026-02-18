import { Fragment } from "react";
import { Section } from "src/components/section";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { CLASS_DETAILS } from "src/models/classes";
import { EXPLORATION_ACTIONS } from "src/models/exploration-actions";
import { getIconPath } from "src/models/icons";
import styles from "./exploration-bar.module.css";

import type { CharacterClass } from "src/models/classes";
import type { IconName } from "src/models/icons";

type ExplorationBarProps = {
  characterClass: CharacterClass;
};

export function ExplorationBar({ characterClass }: ExplorationBarProps) {
  const { expandedKey: expandedAction, toggle: toggleAction } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedAction);

  const classification = CLASS_DETAILS[characterClass].manualClassification;
  const availableActions = EXPLORATION_ACTIONS.filter(
    (a) =>
      !a.classificationRestriction ||
      a.classificationRestriction.includes(classification),
  );

  return (
    <Section title="Exploration Actions">
      <div className={styles.actionsGrid}>
        {availableActions.map((action) => (
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
    </Section>
  );
}
