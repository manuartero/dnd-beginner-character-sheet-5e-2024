import c from "classnames";
import { ProficiencyGrid } from "src/components/proficiency-grid";
import {
  type CharacterClass,
  CLASS_DETAILS,
  CLASS_LIST,
  getClassIcon,
} from "src/models/classes";
import { SelectionGrid } from "../selection-grid";
import styles from "./step-class.module.css";

type StepClassProps = {
  characterClass: CharacterClass | null;
  onClassChange: (characterClass: CharacterClass) => void;
};

const HIT_DIE_OPTIONS = ["d6", "d8", "d10", "d12"] as const;

function HitDieOptions({ selected }: { selected: string }) {
  return (
    <div className={styles.hitDieGroup}>
      {HIT_DIE_OPTIONS.map((die) => (
        <span
          key={die}
          className={c(
            styles.hitDieOption,
            die === selected ? styles.hitDieSelected : styles.hitDieDisabled,
          )}
        >
          {die}
        </span>
      ))}
    </div>
  );
}

export function StepClass({ characterClass, onClassChange }: StepClassProps) {
  const details = characterClass ? CLASS_DETAILS[characterClass] : null;

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Class</h2>
        <SelectionGrid
          items={CLASS_LIST}
          selectedKey={characterClass}
          onSelect={(key) => onClassChange(key as CharacterClass)}
          columns={3}
          getIcon={(key) => getClassIcon(key as CharacterClass)}
        />
      </div>

      {details && characterClass && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsHeader}>
            <img
              src={getClassIcon(characterClass)}
              alt={characterClass}
              className={styles.detailsIcon}
            />
            <div>
              <h3 className={styles.detailsName}>
                {CLASS_LIST.find((c) => c.key === characterClass)?.label}
              </h3>
              <p className={styles.detailsDescription}>{details.description}</p>
            </div>
          </div>
          <dl className={styles.detailsList}>
            <div className={styles.detailsRow}>
              <dt className={styles.detailsLabel}>Hit Die</dt>
              <dd className={styles.detailsValue}>
                <HitDieOptions selected={details.hitDie} />
              </dd>
            </div>
            <div className={styles.detailsRow}>
              <dt className={styles.detailsLabel}>Saves</dt>
              <dd className={styles.detailsValue}>{details.saves}</dd>
            </div>
            <div className={styles.detailsRowBlock}>
              <dt className={styles.detailsLabel}>Proficiencies</dt>
              <dd>
                <ProficiencyGrid proficiencies={details.proficiencies} />
              </dd>
            </div>
          </dl>
        </div>
      )}
    </>
  );
}
