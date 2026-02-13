import { AbilityCard } from "src/components/ability-card";
import { Section } from "src/components/section";
import { useExpandable } from "src/hooks/use-expandable";
import type {
  AbilityName,
  AbilityScores as Scores,
} from "src/models/abilities";
import { ABILITY_LIST } from "src/models/abilities";
import styles from "./ability-scores.module.css";

type AbilityScoresProps = {
  scores: Scores;
  proficiencyBonus?: number;
};

export function AbilityScores({
  scores,
  proficiencyBonus = 2,
}: AbilityScoresProps) {
  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  return (
    <Section title="Abilities">
      <div className={styles.grid}>
        {ABILITY_LIST.map(({ key, short }) => (
          <AbilityCard
            key={key}
            mode="display"
            abilityKey={key}
            short={short}
            score={scores[key]}
            isFlipped={flippedAbility === key}
            proficiencyBonus={proficiencyBonus}
            onToggle={toggleFlip}
          />
        ))}
      </div>
    </Section>
  );
}
