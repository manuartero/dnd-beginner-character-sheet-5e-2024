import { ChipGrid, Section, TileRow } from "elements";
import { abilities } from "src/models/common/abilities";
import { skills } from "src/models/common/skills";
import { backgrounds } from "src/models/origin/backgrounds";
import styles from "./step-origin.module.css";

import type { AbilityName } from "src/models/common/abilities";
import type { Background } from "src/models/origin/backgrounds";

function abilityShortLabel(key: AbilityName): string {
  return abilities.get({ id: key }).short;
}

type StepOriginProps = {
  background: Background | null;
  onBackgroundChange: (background: Background) => void;
};

export function StepOrigin({
  background,
  onBackgroundChange,
}: StepOriginProps) {
  const selected = background ? backgrounds.get({ id: background }) : null;

  return (
    <Section title="Background">
      <ChipGrid
        actions={backgrounds.list().map(({ id, label }) => ({
          key: id,
          label,
          icon: backgrounds.icon({ id }),
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
                  {skills.get({ name: skill }).label}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.infoBox}>
            <span>Ability Bonuses:</span>
            <TileRow
              items={selected.abilityOptions.map((ability) => ({
                key: ability,
                label: abilityShortLabel(ability),
              }))}
            />
          </div>
          <div className={styles.infoBox}>
            Origin Feat:{" "}
            <span className={styles.featLabel}>{selected.originFeat.name}</span>
            <div className={styles.featDescription}>
              {selected.originFeat.description
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
