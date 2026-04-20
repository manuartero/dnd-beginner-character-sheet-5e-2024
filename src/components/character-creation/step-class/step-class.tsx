import c from "classnames";
import { ChipGrid, labelStyles, Section, TileRow } from "elements";
import { DetailsPanel } from "src/components/details-panel";
import { ProficiencyGrid } from "src/components/proficiency-grid/proficiency-grid";
import { type CharacterClass, classes } from "src/models/class/classes";
import styles from "./step-class.module.css";

type StepClassProps = {
  characterClass: CharacterClass | null;
  onClassChange: (characterClass: CharacterClass) => void;
};

const HIT_DIE_OPTIONS = ["d6", "d8", "d10", "d12"] as const;

export function StepClass({ characterClass, onClassChange }: StepClassProps) {
  const details = characterClass ? classes.get(characterClass) : null;

  return (
    <>
      <Section title="Class">
        {classes.byCategory().map((group) => (
          <div key={group.classification} className={styles.group}>
            <h3 className={c(labelStyles.groupLabel, styles.groupLabelSpacing)}>
              {group.label}
            </h3>
            <ChipGrid
              actions={group.classes.map(({ id, details }) => ({
                key: id,
                label: details.label,
                icon: details.icon,
              }))}
              selectedKey={characterClass}
              onSelect={(key) => onClassChange(key as CharacterClass)}
            />
          </div>
        ))}
      </Section>

      {details && characterClass && (
        <DetailsPanel
          icon={details.icon}
          iconAlt={characterClass}
          name={details.label}
          description={details.description}
        >
          <div className={styles.detailsRow}>
            <dt className={styles.detailsLabel}>Hit Die</dt>
            <dd className={styles.detailsValue}>
              <TileRow
                items={HIT_DIE_OPTIONS.map((die) => ({
                  key: die,
                  label: die,
                  selected: die === details.hitDie,
                  dimmed: die !== details.hitDie,
                }))}
              />
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
