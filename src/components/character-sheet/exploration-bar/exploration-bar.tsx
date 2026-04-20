import { ChipGrid, Section } from "elements";
import { classes } from "src/models/class/classes";
import { explorationActions } from "src/models/common/actions";
import { resolveIconPath } from "src/models/common/icons";

import type { CharacterClass } from "src/models/class/classes";

type ExplorationBarProps = {
  characterClass: CharacterClass;
};

export function ExplorationBar({ characterClass }: ExplorationBarProps) {
  const classification = classes.get(characterClass).manualClassification;
  const availableActions = explorationActions
    .forClassification(classification)
    .map((a) => ({
      key: a.name,
      label: a.name,
      description: a.description,
      icon: a.icon ? resolveIconPath(a.icon) : undefined,
    }));

  return (
    <Section title="Exploration Actions">
      <ChipGrid actions={availableActions} />
    </Section>
  );
}
