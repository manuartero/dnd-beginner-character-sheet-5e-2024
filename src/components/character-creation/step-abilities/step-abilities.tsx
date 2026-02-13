import c from "classnames";
import { useState } from "react";
import { AbilityCard } from "src/components/ability-card";
import { Section } from "src/components/section";
import { useExpandable } from "src/hooks/use-expandable";
import type { AbilityName, AbilityScores } from "src/models/abilities";
import { ABILITY_LIST } from "src/models/abilities";
import { type CharacterClass, CLASS_DETAILS } from "src/models/classes";
import { OriginBonusPicker } from "./origin-bonus-picker";
import styles from "./step-abilities.module.css";
import { isValidHp, isValidScore } from "./validation";

type StepAbilitiesProps = {
  characterClass: CharacterClass | null;
  scores: AbilityScores;
  hpMax: number;
  onScoresChange: (scores: AbilityScores) => void;
  onHpMaxChange: (hpMax: number) => void;
  abilityOptions: [AbilityName, AbilityName, AbilityName] | null;
  abilityBonuses: Partial<Record<AbilityName, number>>;
  onAbilityBonusesChange: (
    bonuses: Partial<Record<AbilityName, number>>,
  ) => void;
};

export function StepAbilities({
  characterClass,
  scores,
  hpMax,
  onScoresChange,
  onHpMaxChange,
  abilityOptions,
  abilityBonuses,
  onAbilityBonusesChange,
}: StepAbilitiesProps) {
  const primaryAbilities = characterClass
    ? CLASS_DETAILS[characterClass].primaryAbilities
    : [];
  const [rawScores, setRawScores] = useState<Record<AbilityName, string>>(
    () => {
      const entries = Object.entries(scores) as [AbilityName, number][];
      return Object.fromEntries(
        entries.map(([key, val]) => [key, String(val)]),
      ) as Record<AbilityName, string>;
    },
  );
  const [rawHp, setRawHp] = useState(String(hpMax));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  function handleScoreChange(ability: AbilityName, value: string) {
    setRawScores((prev) => ({ ...prev, [ability]: value }));
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      onScoresChange({ ...scores, [ability]: parsed });
    }
  }

  function handleHpChange(value: string) {
    setRawHp(value);
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      onHpMaxChange(parsed);
    }
  }

  function handleBlur(field: AbilityName | "hp") {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  return (
    <>
      <Section title="Ability Scores">
        <div className={styles.grid}>
          {ABILITY_LIST.map(({ key, short }) => {
            const raw = rawScores[key];
            const showError = touched[key] && !isValidScore(raw);
            const bonus = abilityBonuses[key] ?? 0;
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

      <Section title="Hit Points">
        <div className={styles.hpRow}>
          <span className={styles.hpLabel}>HP Max</span>
          <input
            type="text"
            inputMode="numeric"
            value={rawHp}
            onChange={(e) => handleHpChange(e.target.value)}
            onBlur={() => handleBlur("hp")}
            className={c(
              styles.hpInput,
              touched.hp && !isValidHp(rawHp) && styles.hpInputError,
            )}
          />
        </div>
      </Section>
    </>
  );
}
