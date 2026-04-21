import { Section, TileRow } from "elements";
import { totalBonuses } from "src/components/character-creation/total-bonuses";
import { abilities } from "src/models/common/abilities";
import styles from "./step-abilities.module.css";

import type { AbilityName } from "src/models/common/abilities";

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

  function incrementBonus(ability: AbilityName) {
    const current = abilityBonuses[ability] ?? 0;
    if (remaining > 0) {
      onAbilityBonusesChange({ ...abilityBonuses, [ability]: current + 1 });
    } else {
      decrementBonus(ability);
    }
  }

  const items = abilities.list().map(({ id, short }) => {
    const allocated = abilityBonuses[id] ?? 0;
    return {
      key: id,
      label: short,
      selected: allocated > 0,
      dimmed: !abilityOptions.includes(id),
      badge: allocated > 0 ? `+${allocated}` : undefined,
    };
  });

  return (
    <Section title="Origin Bonus">
      <p className={styles.bonusHint}>
        {remaining} bonus {remaining === 1 ? "point" : "points"} remaining
      </p>
      <TileRow
        items={items}
        columns={6}
        onPick={(key) => incrementBonus(key as AbilityName)}
        onUnpick={(key) => decrementBonus(key as AbilityName)}
      />
    </Section>
  );
}
