import { AbilityCard, Section } from "elements";
import { useExpandable } from "src/hooks/use-expandable";
import { ABILITY_LIST } from "src/models/abilities";
import styles from "./ability-scores.module.css";

import type {
  AbilityName,
  AbilityScores as Scores,
} from "src/models/abilities";

type AbilityScoresProps = {
  scores: Scores;
};

export function AbilityScores({ scores }: AbilityScoresProps) {
  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  return (
    <Section title="Abilities">
      <div className={styles.grid}>
        {ABILITY_LIST.map(({ key }) => (
          <AbilityCard
            key={key}
            mode="display"
            abilityKey={key}
            score={scores[key]}
            isFlipped={flippedAbility === key}
            onToggle={toggleFlip}
          />
        ))}
      </div>
    </Section>
  );
}
