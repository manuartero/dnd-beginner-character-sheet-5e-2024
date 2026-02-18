import { DetailsPanel } from "src/components/details-panel";
import { Section } from "src/components/section";
import {
  getSpeciesIcon,
  SPECIES_DETAILS,
  SPECIES_LIST,
} from "src/models/species";
import { SelectionGrid } from "../selection-grid";
import styles from "./step-species.module.css";

import type { Species } from "src/models/species";

type StepSpeciesProps = {
  race: Species | null;
  onRaceChange: (race: Species) => void;
};

export function StepSpecies({ race, onRaceChange }: StepSpeciesProps) {
  const details = race ? SPECIES_DETAILS[race] : null;

  return (
    <>
      <Section title="Species">
        <SelectionGrid
          items={SPECIES_LIST}
          selectedKey={race}
          onSelect={(key) => onRaceChange(key as Species)}
          columns={3}
          getIcon={(key) => getSpeciesIcon(key as Species)}
          iconSize="large"
        />
      </Section>

      {details && race && (
        <DetailsPanel
          icon={getSpeciesIcon(race)}
          iconAlt={race}
          name={SPECIES_LIST.find((r) => r.key === race)?.label ?? race}
          description={details.description}
        >
          <div className={styles.detailsRow}>
            <dt className={styles.detailsLabel}>Size</dt>
            <dd className={styles.detailsValue}>{details.size}</dd>
          </div>
          <div className={styles.detailsRow}>
            <dt className={styles.detailsLabel}>Speed</dt>
            <dd className={styles.detailsValue}>{details.speed}</dd>
          </div>
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
        </DetailsPanel>
      )}
    </>
  );
}
