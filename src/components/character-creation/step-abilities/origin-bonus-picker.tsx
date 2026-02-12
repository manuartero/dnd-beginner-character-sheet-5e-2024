import { totalBonuses } from "src/components/character-creation/total-bonuses";
import type { AbilityName } from "src/models/abilities";
import { ABILITY_LIST } from "src/models/abilities";
import styles from "./step-abilities.module.css";

type OriginBonusPickerProps = {
  abilityOptions: [AbilityName, AbilityName, AbilityName];
  abilityBonuses: Partial<Record<AbilityName, number>>;
  onAbilityBonusesChange: (
    bonuses: Partial<Record<AbilityName, number>>,
  ) => void;
};

export function OriginBonusPicker({
  abilityOptions,
  abilityBonuses,
  onAbilityBonusesChange,
}: OriginBonusPickerProps) {
  const remaining = 3 - totalBonuses(abilityBonuses);

  function decrementBonus(ability: AbilityName) {
    const current = abilityBonuses[ability] ?? 0;
    if (current <= 0) return;
    const next = { ...abilityBonuses };
    if (current === 1) {
      delete next[ability];
    } else {
      next[ability] = current - 1;
    }
    onAbilityBonusesChange(next);
  }

  function handleClick(ability: AbilityName) {
    const current = abilityBonuses[ability] ?? 0;
    if (remaining > 0) {
      onAbilityBonusesChange({
        ...abilityBonuses,
        [ability]: current + 1,
      });
    } else {
      decrementBonus(ability);
    }
  }

  function handleRightClick(e: React.MouseEvent, ability: AbilityName) {
    e.preventDefault();
    decrementBonus(ability);
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Origin Bonus</h2>
      <p className={styles.bonusHint}>
        {remaining} bonus {remaining === 1 ? "point" : "points"} remaining
      </p>
      <div className={styles.bonusGrid}>
        {ABILITY_LIST.map(({ key, short }) => {
          const eligible = abilityOptions.includes(key);
          const allocated = abilityBonuses[key] ?? 0;
          return (
            <button
              key={key}
              type="button"
              disabled={!eligible}
              className={`${styles.bonusCell} ${eligible ? styles.bonusCellEligible : ""} ${allocated > 0 ? styles.bonusCellActive : ""}`}
              onClick={() => eligible && handleClick(key)}
              onContextMenu={(e) => eligible && handleRightClick(e, key)}
            >
              <span className={styles.bonusAbility}>{short}</span>
              {allocated > 0 && (
                <span className={styles.bonusCount}>+{allocated}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
