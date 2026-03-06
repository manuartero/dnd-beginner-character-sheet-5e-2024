import c from "classnames";
import { ChipGrid, labelStyles, Section } from "elements";
import { DetailsPanel } from "src/components/details-panel";
import { ProficiencyGrid } from "src/components/proficiency-grid/proficiency-grid";
import {
  type CharacterClass,
  CLASS_DETAILS,
  CLASS_LIST,
  CLASSES_BY_CATEGORY,
  getClassIcon,
} from "src/models/classes";
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
      <Section title="Class">
        {CLASSES_BY_CATEGORY.map((group) => (
          <div key={group.classification} className={styles.group}>
            <h3 className={c(labelStyles.groupLabel, styles.groupLabelSpacing)}>
              {group.label}
            </h3>
            <ChipGrid
              actions={group.classes.map(({ key, label }) => ({
                key,
                label,
                icon: getClassIcon(key as CharacterClass),
              }))}
              selectedKey={characterClass}
              onSelect={(key) => onClassChange(key as CharacterClass)}
            />
          </div>
        ))}
      </Section>

      {details && characterClass && (
        <DetailsPanel
          icon={getClassIcon(characterClass)}
          iconAlt={characterClass}
          name={
            CLASS_LIST.find((c) => c.key === characterClass)?.label ??
            characterClass
          }
          description={details.description}
        >
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
        </DetailsPanel>
      )}
    </>
  );
}
