import { ActionButton } from "src/components/action-button/action-button";
import { Section } from "src/components/section";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { CLASS_DETAILS } from "src/models/classes";
import { EXPLORATION_ACTIONS } from "src/models/exploration-actions";
import styles from "./exploration-bar.module.css";

import type { CharacterClass } from "src/models/classes";

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
    </Section>
  );
}
