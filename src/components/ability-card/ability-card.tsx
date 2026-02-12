import type { AbilityName } from "src/models/abilities";
import { computeModifier, formatModifier } from "src/models/abilities";
import {
  computeSkillModifier,
  DEFAULT_PROFICIENCIES,
  skillsForAbility,
} from "src/models/skills";
import styles from "./ability-card.module.css";

type _BaseProps = {
  abilityKey: AbilityName;
  short: string;
  score: number;
  isFlipped: boolean;
  proficiencyBonus: number;
  onToggle: (key: AbilityName) => void;
};

type AbilityCardDisplayProps = _BaseProps & {
  mode: "display";
};

type AbilityCardCreationProps = _BaseProps & {
  mode: "creation";
  rawScore: string;
  isPrimary: boolean;
  bonus: number;
  showError: boolean;
  onScoreChange: (ability: AbilityName, value: string) => void;
  onBlur: (ability: AbilityName) => void;
};

type AbilityCardProps = AbilityCardDisplayProps | AbilityCardCreationProps;

export function AbilityCard(props: AbilityCardProps) {
  const { abilityKey, short, score, isFlipped, proficiencyBonus, onToggle } =
    props;
  const mod = computeModifier(score);
  const skills = skillsForAbility(abilityKey);
  const hasSkills = skills.length > 0;

  const cardClasses = [styles.abilityCard];
  if (hasSkills) cardClasses.push(styles.abilityCardClickable);
  if (isFlipped) cardClasses.push(styles.abilityCardActive);
  if (props.mode === "creation" && props.isPrimary) {
    cardClasses.push(styles.abilityCardPrimary);
  }
  const cardClass = cardClasses.join(" ");

  const content = (
    <>
      <span className={styles.label}>{short}</span>
      {isFlipped ? (
        <SkillList
          skills={skills}
          abilityModifier={mod}
          proficiencyBonus={proficiencyBonus}
        />
      ) : props.mode === "display" ? (
        <DisplayFront score={score} mod={mod} />
      ) : (
        <CreationFront
          abilityKey={abilityKey}
          rawScore={props.rawScore}
          mod={mod}
          bonus={props.bonus}
          showError={props.showError}
          onScoreChange={props.onScoreChange}
          onBlur={props.onBlur}
        />
      )}
    </>
  );

  if (props.mode === "display" && hasSkills) {
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

  if (props.mode === "creation") {
    return (
      <button
        className={cardClass}
        type="button"
        onClick={hasSkills ? () => onToggle(abilityKey) : undefined}
        onKeyDown={
          hasSkills
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle(abilityKey);
                }
              }
            : undefined
        }
        tabIndex={hasSkills ? 0 : undefined}
      >
        {content}
      </button>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

type DisplayFrontProps = {
  score: number;
  mod: number;
};

function DisplayFront({ score, mod }: DisplayFrontProps) {
  return (
    <>
      <span className={styles.score}>Score: {score}</span>
      <span className={`${styles.modifier} ${modifierColorClass(mod)}`}>
        {formatModifier(mod)}
      </span>
    </>
  );
}

type CreationFrontProps = {
  abilityKey: AbilityName;
  rawScore: string;
  mod: number;
  bonus: number;
  showError: boolean;
  onScoreChange: (ability: AbilityName, value: string) => void;
  onBlur: (ability: AbilityName) => void;
};

function CreationFront({
  abilityKey,
  rawScore,
  mod,
  bonus,
  showError,
  onScoreChange,
  onBlur,
}: CreationFrontProps) {
  return (
    <>
      <span className={styles.modifierSmall}>{formatModifier(mod)}</span>
      {bonus > 0 && <span className={styles.bonusBadge}>+{bonus}</span>}
      <input
        type="text"
        maxLength={2}
        inputMode="numeric"
        value={rawScore}
        onChange={(e) => onScoreChange(abilityKey, e.target.value)}
        onBlur={() => onBlur(abilityKey)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className={`${styles.scoreInput} ${showError ? styles.scoreInputError : ""}`}
      />
    </>
  );
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

function modifierColorClass(mod: number): string {
  if (mod < 0) return styles.modifierNegative;
  if (mod === 0) return styles.modifierNeutral;
  if (mod >= 3) return styles.modifierHigh;
  return styles.modifierPositive;
}
