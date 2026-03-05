import c from "classnames";
import { ScorePicker } from "src/components/character-creation/score-picker";
import {
  ABILITY_LIST,
  computeModifier,
  computeProficiencyBonus,
  formatModifier,
} from "src/models/abilities";
import {
  computeSkillModifier,
  DEFAULT_PROFICIENCIES,
  skillsForAbility,
} from "src/models/skills";
import styles from "./ability-card.module.css";

import type { AbilityName } from "src/models/abilities";

const ABILITY_SHORTS = Object.fromEntries(
  ABILITY_LIST.map(({ key, short }) => [key, short]),
) as Record<AbilityName, string>;

type _BaseProps = {
  abilityKey: AbilityName;
  score: number;
  isFlipped?: boolean;
  onToggle: (key: AbilityName) => void;
};

type AbilityCardDisplayProps = _BaseProps & {
  mode: "display";
};

type AbilityCardCreationProps = _BaseProps & {
  mode: "creation";
  rawScore: string;
  isPrimary?: boolean;
  bonus: number;
  showError?: boolean;
  readOnly?: boolean;
  onScoreChange: (ability: AbilityName, value: string) => void;
  onBlur: (ability: AbilityName) => void;
};

type AbilityCardAssignProps = _BaseProps & {
  mode: "assign";
  isPrimary?: boolean;
  bonus: number;
  availableValues: number[];
  selectedValue: number | null;
  onAssign: (ability: AbilityName, value: number | null) => void;
};

type AbilityCardProps =
  | AbilityCardDisplayProps
  | AbilityCardCreationProps
  | AbilityCardAssignProps;

/**
 * AbilityCard — ability score box / toggle button
 *
 *  [ STR ]          [ DEX ]
 *  +2               +1
 *                   (expanded)
 *                   +-----------+
 *                   | Acrobatics|  +3
 *                   | Stealth   |  +1
 *                   +-----------+
 *
 *  modes: "display" | "creation" | "assign"
 *  flips open to show linked skill modifiers
 */
export function AbilityCard(props: AbilityCardProps) {
  const { abilityKey, score, isFlipped = false, onToggle } = props;
  const short = ABILITY_SHORTS[abilityKey];
  const mod = computeModifier(score);
  const proficiencyBonus = computeProficiencyBonus(1);
  const skills = skillsForAbility(abilityKey);
  const hasSkills = skills.length > 0;

  const isPrimary =
    (props.mode === "creation" || props.mode === "assign") && !!props.isPrimary;

  const cardClass = c(
    styles.abilityCard,
    hasSkills && styles.abilityCardClickable,
    isFlipped && styles.abilityCardActive,
    isPrimary && styles.abilityCardPrimary,
  );

  // assign mode has interactive inner buttons (ScorePicker tiles) — the outer
  // wrapper must be a div; the label itself becomes the toggle button instead.
  if (hasSkills && props.mode === "assign") {
    return (
      <div className={cardClass}>
        <AbilityCardContent
          {...props}
          mod={mod}
          proficiencyBonus={proficiencyBonus}
          skills={skills}
          short={short}
          labelIsToggle
        />
      </div>
    );
  }

  if (hasSkills) {
    return (
      <button
        type="button"
        className={cardClass}
        aria-label={short}
        aria-expanded={isFlipped}
        onClick={() => onToggle(abilityKey)}
      >
        <AbilityCardContent
          {...props}
          mod={mod}
          proficiencyBonus={proficiencyBonus}
          skills={skills}
          short={short}
        />
      </button>
    );
  }

  return (
    <div className={cardClass}>
      <AbilityCardContent
        {...props}
        mod={mod}
        proficiencyBonus={proficiencyBonus}
        skills={skills}
        short={short}
      />
    </div>
  );
}

type AbilityCardContentProps = AbilityCardProps & {
  mod: number;
  proficiencyBonus: number;
  skills: { name: string; label: string }[];
  short: string;
  labelIsToggle?: boolean;
};

function AbilityCardContent({
  mod,
  proficiencyBonus,
  skills,
  short,
  labelIsToggle = false,
  ...props
}: AbilityCardContentProps) {
  const { isFlipped = false, abilityKey, onToggle } = props;
  return (
    <>
      {labelIsToggle ? (
        <button
          type="button"
          className={styles.label}
          aria-label={short}
          aria-expanded={isFlipped}
          onClick={() => onToggle(abilityKey)}
        >
          {short}
        </button>
      ) : (
        <span className={styles.label}>{short}</span>
      )}
      {isFlipped ? (
        <SkillList
          skills={skills}
          abilityModifier={mod}
          proficiencyBonus={proficiencyBonus}
        />
      ) : props.mode === "display" ? (
        <DisplayFront score={props.score} mod={mod} />
      ) : props.mode === "assign" ? (
        <AssignFront
          abilityKey={abilityKey}
          mod={mod}
          bonus={props.bonus}
          availableValues={props.availableValues}
          selectedValue={props.selectedValue}
          onAssign={props.onAssign}
        />
      ) : props.readOnly ? (
        <ReadOnlyFront
          rawScore={props.rawScore}
          mod={mod}
          bonus={props.bonus}
        />
      ) : (
        <CreationFront
          abilityKey={abilityKey}
          rawScore={props.rawScore}
          mod={mod}
          bonus={props.bonus}
          showError={props.showError ?? false}
          onScoreChange={props.onScoreChange}
          onBlur={props.onBlur}
        />
      )}
    </>
  );
}

type DisplayFrontProps = {
  score: number;
  mod: number;
};

function DisplayFront({ score, mod }: DisplayFrontProps) {
  return (
    <>
      <span className={styles.score}>Score: {score}</span>
      <span className={c(styles.modifier, modifierColorClass(mod))}>
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
        className={c(styles.scoreInput, showError && styles.scoreInputError)}
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
    <ul className={styles.skillList}>
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
          <li
            key={skill.name}
            className={c(
              styles.skillRow,
              isProficient && styles.skillProficient,
            )}
          >
            <span className={styles.skillName}>{skill.label}</span>
            <span className={styles.skillModifier}>
              {formatModifier(skillMod)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

type ReadOnlyFrontProps = {
  rawScore: string;
  mod: number;
  bonus: number;
};

function ReadOnlyFront({ rawScore, mod, bonus }: ReadOnlyFrontProps) {
  return (
    <>
      <span className={styles.modifierSmall}>{formatModifier(mod)}</span>
      {bonus > 0 && <span className={styles.bonusBadge}>+{bonus}</span>}
      <span className={styles.scoreReadOnly}>{rawScore}</span>
    </>
  );
}

type AssignFrontProps = {
  abilityKey: AbilityName;
  mod: number;
  bonus: number;
  availableValues: number[];
  selectedValue: number | null;
  onAssign: (ability: AbilityName, value: number | null) => void;
};

function AssignFront({
  abilityKey,
  mod,
  bonus,
  availableValues,
  selectedValue,
  onAssign,
}: AssignFrontProps) {
  return (
    <>
      <span className={styles.modifierSmall}>{formatModifier(mod)}</span>
      {bonus > 0 && <span className={styles.bonusBadge}>+{bonus}</span>}
      <ScorePicker
        availableValues={availableValues}
        selectedValue={selectedValue}
        onPick={(value) => onAssign(abilityKey, value)}
      />
    </>
  );
}

function modifierColorClass(mod: number): string {
  if (mod < 0) return styles.modifierNegative;
  if (mod === 0) return styles.modifierNeutral;
  if (mod >= 3) return styles.modifierHigh;
  return styles.modifierPositive;
}
