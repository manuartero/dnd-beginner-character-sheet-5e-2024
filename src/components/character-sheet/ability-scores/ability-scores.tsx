import type { AbilityName, AbilityScores as Scores } from "src/data/abilities";
import {
  ABILITY_LIST,
  computeModifier,
  formatModifier,
} from "src/data/abilities";
import {
  computeSkillModifier,
  DEFAULT_PROFICIENCIES,
  skillsForAbility,
} from "src/data/skills";
import { useExpandable } from "src/hooks/use-expandable";
import styles from "./ability-scores.module.css";

function modifierColorClass(mod: number): string {
  if (mod < 0) return styles.modifierNegative;
  if (mod === 0) return styles.modifierNeutral;
  if (mod >= 3) return styles.modifierHigh;
  return styles.modifierPositive;
}

type AbilityScoresProps = {
  scores: Scores;
  editable: boolean;
  onScoreChange?: (ability: AbilityName, value: number) => void;
  proficiencyBonus?: number;
};

export function AbilityScores({
  scores,
  editable,
  onScoreChange,
  proficiencyBonus = 2,
}: AbilityScoresProps) {
  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Abilities</h2>
      <div className={styles.grid}>
        {ABILITY_LIST.map(({ key, short }) => (
          <AbilityCard
            key={key}
            abilityKey={key}
            short={short}
            score={scores[key]}
            editable={editable}
            isFlipped={!editable && flippedAbility === key}
            proficiencyBonus={proficiencyBonus}
            onScoreChange={onScoreChange}
            onToggle={toggleFlip}
          />
        ))}
      </div>
    </div>
  );
}

type AbilityCardProps = {
  abilityKey: AbilityName;
  short: string;
  score: number;
  editable: boolean;
  isFlipped: boolean;
  proficiencyBonus: number;
  onScoreChange?: (ability: AbilityName, value: number) => void;
  onToggle: (key: AbilityName) => void;
};

function AbilityCard({
  abilityKey,
  short,
  score,
  editable,
  isFlipped,
  proficiencyBonus,
  onScoreChange,
  onToggle,
}: AbilityCardProps) {
  const mod = computeModifier(score);
  const skills = skillsForAbility(abilityKey);
  const isClickable = !editable && skills.length > 0;

  const cardClass = isClickable
    ? `${styles.abilityCard} ${styles.abilityCardClickable} ${isFlipped ? styles.abilityCardActive : ""}`
    : styles.abilityCard;

  const content = (
    <>
      <span className={styles.label}>{short}</span>
      {isFlipped ? (
        <SkillList
          skills={skills}
          abilityModifier={mod}
          proficiencyBonus={proficiencyBonus}
        />
      ) : (
        <ScoreDisplay
          score={score}
          mod={mod}
          editable={editable}
          abilityKey={abilityKey}
          onScoreChange={onScoreChange}
        />
      )}
    </>
  );

  if (isClickable) {
    return (
      <button
        type="button"
        className={cardClass}
        onClick={() => onToggle(abilityKey)}
      >
        {content}
      </button>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

type SkillListProps = {
  skills: { name: string; label: string }[];
  abilityModifier: number;
  proficiencyBonus: number;
};

function SkillList({
  skills,
  abilityModifier,
  proficiencyBonus,
}: SkillListProps) {
  return (
    <div className={styles.skillList}>
      {skills.map((skill) => {
        const isProficient = DEFAULT_PROFICIENCIES.includes(
          skill.name as Parameters<typeof DEFAULT_PROFICIENCIES.includes>[0],
        );
        const skillMod = computeSkillModifier({
          abilityModifier,
          proficiencyBonus,
          isProficient,
        });
        return (
          <div
            key={skill.name}
            className={`${styles.skillRow} ${isProficient ? styles.skillProficient : ""}`}
          >
            <span className={styles.skillName}>{skill.label}</span>
            <span className={styles.skillModifier}>
              {formatModifier(skillMod)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

type ScoreDisplayProps = {
  score: number;
  mod: number;
  editable: boolean;
  abilityKey: AbilityName;
  onScoreChange?: (ability: AbilityName, value: number) => void;
};

function ScoreDisplay({
  score,
  mod,
  editable,
  abilityKey,
  onScoreChange,
}: ScoreDisplayProps) {
  return (
    <>
      {editable ? (
        <input
          type="number"
          min={1}
          max={30}
          value={score}
          onChange={(e) => {
            const parsed = Number.parseInt(e.target.value, 10);
            if (!Number.isNaN(parsed) && onScoreChange) {
              onScoreChange(abilityKey, parsed);
            }
          }}
          className={styles.scoreInput}
        />
      ) : (
        <span className={styles.score}>Score: {score}</span>
      )}
      <span className={`${styles.modifier} ${modifierColorClass(mod)}`}>
        {formatModifier(mod)}
      </span>
    </>
  );
}
