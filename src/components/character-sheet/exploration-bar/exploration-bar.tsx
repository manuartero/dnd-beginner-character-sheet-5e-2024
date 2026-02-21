import { ActionButtonGrid } from "src/components/action-button-grid/action-button-grid";
import { Section } from "src/components/section";
import { CLASS_DETAILS } from "src/models/classes";
import { EXPLORATION_ACTIONS } from "src/models/exploration-actions";

import type { CharacterClass } from "src/models/classes";

type ExplorationBarProps = {
  characterClass: CharacterClass;
};

export function ExplorationBar({ characterClass }: ExplorationBarProps) {
  const classification = CLASS_DETAILS[characterClass].manualClassification;
  const availableActions = EXPLORATION_ACTIONS.filter(
    (a) =>
      !a.classificationRestriction ||
      a.classificationRestriction.includes(classification),
  );

  return (
    <Section title="Exploration Actions">
      <ActionButtonGrid actions={availableActions} />
    </Section>
  );
}
