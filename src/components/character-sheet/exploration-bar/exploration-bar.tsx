import { ChipGrid, Section } from "elements";
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
      <ChipGrid actions={availableActions} />
    </Section>
  );
}
