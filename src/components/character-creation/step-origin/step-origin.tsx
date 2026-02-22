import { Section } from "src/components/section";
import { SelectionGrid } from "src/components/selection-grid";
import { ABILITY_LIST } from "src/models/abilities";
import {
  BACKGROUND_LIST,
  getBackgroundIcon,
  getOriginFeatDescription,
  getSkillLabel,
} from "src/models/backgrounds";
import styles from "./step-origin.module.css";

import type { AbilityName } from "src/models/abilities";
import type { Background } from "src/models/backgrounds";

function abilityShortLabel(key: AbilityName): string {
  return ABILITY_LIST.find((a) => a.key === key)?.short ?? key;
}

type StepOriginProps = {
  background: Background | null;
  onBackgroundChange: (background: Background) => void;
};

export function StepOrigin({
  background,
  onBackgroundChange,
}: StepOriginProps) {
  const selected = BACKGROUND_LIST.find((b) => b.key === background);

  return (
    <Section title="Background">
      <SelectionGrid
        items={BACKGROUND_LIST.map(({ key, label }) => ({
          key,
          label,
          icon: getBackgroundIcon(key as Background),
        }))}
        selectedKey={background}
        onSelect={(key) => onBackgroundChange(key as Background)}
      />
      {selected && (
        <div className={styles.originInfo}>
          <div className={styles.infoBox}>
            <span>Skill Proficiencies:</span>
            <ul className={styles.skillList}>
              {selected.skillProficiencies.map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {getSkillLabel(skill)}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.infoBox}>
            <span>Ability Bonuses:</span>
            <div className={styles.abilityBonuses}>
              {selected.abilityOptions.map((ability) => (
                <span key={ability} className={styles.abilityBadge}>
                  {abilityShortLabel(ability)}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.infoBox}>
            Origin Feat:{" "}
            <span className={styles.featLabel}>{selected.originFeatLabel}</span>
            <div className={styles.featDescription}>
              {getOriginFeatDescription(selected.originFeat)
                .split(". ")
                .filter(Boolean)
                .map((sentence) => (
                  <p key={sentence}>
                    {sentence.endsWith(".") ? sentence : `${sentence}.`}
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
