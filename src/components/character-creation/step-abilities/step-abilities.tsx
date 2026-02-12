import { useState } from "react";
import type { AbilityName, AbilityScores } from "src/models/abilities";
import {
  ABILITY_LIST,
  computeModifier,
  formatModifier,
} from "src/models/abilities";
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

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ability Scores</h2>
        <div className={styles.grid}>
          {ABILITY_LIST.map(({ key, short }) => {
            const raw = rawScores[key];
            const showError = touched[key] && !isValidScore(raw);
            const bonus = abilityBonuses[key] ?? 0;
            const baseScore = isValidScore(raw) ? Number.parseInt(raw, 10) : 10;
            const displayMod = formatModifier(
              computeModifier(baseScore + bonus),
            );
            const isPrimary = primaryAbilities.includes(key);
            return (
              <div
                key={key}
                className={`${styles.abilityCard} ${isPrimary ? styles.abilityCardPrimary : ""}`}
              >
                <span className={styles.modifier}>{displayMod}</span>
                {bonus > 0 && (
                  <span className={styles.bonusBadge}>+{bonus}</span>
                )}
                <span className={styles.label}>{short}</span>
                <input
                  type="text"
                  maxLength={2}
                  inputMode="numeric"
                  value={raw}
                  onChange={(e) => handleScoreChange(key, e.target.value)}
                  onBlur={() => handleBlur(key)}
                  className={`${styles.scoreInput} ${showError ? styles.scoreInputError : ""}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {abilityOptions && (
        <OriginBonusPicker
          abilityOptions={abilityOptions}
          abilityBonuses={abilityBonuses}
          onAbilityBonusesChange={onAbilityBonusesChange}
        />
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Hit Points</h2>
        <div className={styles.hpRow}>
          <span className={styles.hpLabel}>HP Max</span>
          <input
            type="text"
            inputMode="numeric"
            value={rawHp}
            onChange={(e) => handleHpChange(e.target.value)}
            onBlur={() => handleBlur("hp")}
            className={`${styles.hpInput} ${touched.hp && !isValidHp(rawHp) ? styles.hpInputError : ""}`}
          />
        </div>
      </div>
    </>
  );
}
