import { AbilityCard, Section } from "elements";
import { useExpandable } from "src/hooks/use-expandable";
import { abilities } from "src/models/common/abilities";
import styles from "./ability-scores.module.css";

import type {
  AbilityName,
  AbilityScores as Scores,
} from "src/models/common/abilities";

type AbilityScoresProps = {
  scores: Scores;
};

export function AbilityScores({ scores }: AbilityScoresProps) {
  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  return (
    <Section title="Abilities">
      <div className={styles.grid}>
        {abilities.list().map(({ id }) => (
          <AbilityCard
            key={id}
            mode="display"
            abilityKey={id}
            score={scores[id]}
            isFlipped={flippedAbility === id}
            onToggle={toggleFlip}
          />
        ))}
      </div>
    </Section>
  );
}
