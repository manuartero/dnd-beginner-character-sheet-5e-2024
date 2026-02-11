import type { CharacterRace } from "src/data/races";
import { RACE_LIST } from "src/data/races";
import { SPECIES_DETAILS } from "src/data/species-details";
import { getSpeciesIcon } from "src/data/species-icons";
import { SelectionGrid } from "../selection-grid";
import styles from "./step-species.module.css";

type StepSpeciesProps = {
  race: CharacterRace | null;
  onRaceChange: (race: CharacterRace) => void;
};

export function StepSpecies({ race, onRaceChange }: StepSpeciesProps) {
  const details = race ? SPECIES_DETAILS[race] : null;

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Species</h2>
        <SelectionGrid
          items={RACE_LIST}
          selectedKey={race}
          onSelect={(key) => onRaceChange(key as CharacterRace)}
          columns={2}
          getIcon={(key) => getSpeciesIcon(key as CharacterRace)}
          iconSize={96}
        />
      </div>

      {details && race && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsHeader}>
            <img
              src={getSpeciesIcon(race)}
              alt={race}
              className={styles.detailsIcon}
            />
            <div>
              <h3 className={styles.detailsName}>
                {RACE_LIST.find((r) => r.key === race)?.label}
              </h3>
              <p className={styles.detailsDescription}>{details.description}</p>
            </div>
          </div>
          <dl className={styles.detailsList}>
            <div className={styles.detailsRow}>
              <dt className={styles.detailsLabel}>Size</dt>
              <dd className={styles.detailsValue}>{details.size}</dd>
            </div>
            <div className={styles.detailsRow}>
              <dt className={styles.detailsLabel}>Speed</dt>
              <dd className={styles.detailsValue}>{details.speed}</dd>
            </div>
          </dl>
          <div className={styles.traitsSection}>
            <h4 className={styles.traitsTitle}>Traits</h4>
            <div className={styles.traitsList}>
              {details.traits.map((trait) => (
                <span key={trait} className={styles.traitBadge}>
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
