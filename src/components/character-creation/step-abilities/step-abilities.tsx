import { AbilityCard } from "src/components/ability-card";
import { RetroRadio } from "src/components/character-creation/retro-radio";
import { HpTracker } from "src/components/character-sheet/hp-tracker";
import { Section } from "src/components/section";
import { useExpandable } from "src/hooks/use-expandable";
import {
  ABILITY_LIST,
  computeModifier,
  formatModifier,
} from "src/models/abilities";
import { CLASS_DETAILS } from "src/models/classes";
import { isValidScore } from "./is-valid-score";
import { OriginBonusPicker } from "./origin-bonus-picker";
import styles from "./step-abilities.module.css";
import { MODE_OPTIONS, useAbilityScores } from "./use-ability-scores";

import type { AbilityName, AbilityScores } from "src/models/abilities";
import type { CharacterClass } from "src/models/classes";

type StepAbilitiesProps = {
  characterClass: CharacterClass | null;
  scores: AbilityScores;
  onScoresChange: (scores: AbilityScores) => void;
  hpMax: number;
  abilityOptions: [AbilityName, AbilityName, AbilityName] | null;
  abilityBonuses: Partial<Record<AbilityName, number>>;
  onAbilityBonusesChange: (
    bonuses: Partial<Record<AbilityName, number>>,
  ) => void;
};

export function StepAbilities({
  characterClass,
  scores,
  onScoresChange,
  hpMax,
  abilityOptions,
  abilityBonuses,
  onAbilityBonusesChange,
}: StepAbilitiesProps) {
  const primaryAbilities = characterClass
    ? CLASS_DETAILS[characterClass].primaryAbilities
    : [];

  const {
    mode,
    rawScores,
    assignments,
    touched,
    handleModeChange,
    handleScoreChange,
    handleAssign,
    handleBlur,
    computeAvailableValues,
  } = useAbilityScores({ characterClass, scores, onScoresChange });

  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  const conScore = scores.con + (abilityBonuses.con ?? 0);
  const conModifier = computeModifier(conScore);

  return (
    <>
      <Section title="Ability Scores">
        <div className={styles.modeSelector}>
          <RetroRadio
            options={MODE_OPTIONS}
            selected={mode}
            name="ability-score-mode"
            onSelect={handleModeChange}
          />
        </div>

        <div className={styles.grid}>
          {ABILITY_LIST.map(({ key, short }) => {
            const bonus = abilityBonuses[key] ?? 0;

            if (mode === "quick-start") {
              const raw = rawScores[key];
              const baseScore = Number.parseInt(raw, 10) || 10;
              return (
                <AbilityCard
                  key={key}
                  mode="creation"
                  readOnly
                  abilityKey={key}
                  short={short}
                  score={baseScore + bonus}
                  isFlipped={flippedAbility === key}
                  proficiencyBonus={2}
                  onToggle={toggleFlip}
                  rawScore={raw}
                  isPrimary={primaryAbilities.includes(key)}
                  bonus={bonus}
                  showError={false}
                  onScoreChange={handleScoreChange}
                  onBlur={handleBlur}
                />
              );
            }

            if (mode === "customize") {
              const selected = assignments[key];
              const baseScore = selected ?? 10;
              return (
                <AbilityCard
                  key={key}
                  mode="assign"
                  abilityKey={key}
                  short={short}
                  score={baseScore + bonus}
                  isFlipped={flippedAbility === key}
                  proficiencyBonus={2}
                  onToggle={toggleFlip}
                  isPrimary={primaryAbilities.includes(key)}
                  bonus={bonus}
                  availableValues={computeAvailableValues(key)}
                  selectedValue={selected}
                  onAssign={handleAssign}
                />
              );
            }

            const raw = rawScores[key];
            const showError = touched[key] && !isValidScore(raw);
            const baseScore = isValidScore(raw) ? Number.parseInt(raw, 10) : 10;
            return (
              <AbilityCard
                key={key}
                mode="creation"
                abilityKey={key}
                short={short}
                score={baseScore + bonus}
                isFlipped={flippedAbility === key}
                proficiencyBonus={2}
                onToggle={toggleFlip}
                rawScore={raw}
                isPrimary={primaryAbilities.includes(key)}
                bonus={bonus}
                showError={showError}
                onScoreChange={handleScoreChange}
                onBlur={handleBlur}
              />
            );
          })}
        </div>
      </Section>

      {abilityOptions && (
        <OriginBonusPicker
          abilityOptions={abilityOptions}
          abilityBonuses={abilityBonuses}
          onAbilityBonusesChange={onAbilityBonusesChange}
        />
      )}

      {characterClass && hpMax > 0 && (
        <HpTracker
          mode="creation"
          max={hpMax}
          description={`Hit Die: ${CLASS_DETAILS[characterClass].hitDie} (from ${CLASS_DETAILS[characterClass].label}) + CON modifier (${formatModifier(conModifier)})`}
        />
      )}
    </>
  );
}
