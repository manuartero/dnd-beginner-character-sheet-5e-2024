import { ChipGrid, Section } from "elements";
import { DetailsPanel } from "src/components/details-panel";
import { species } from "src/models/origin/species";
import styles from "./step-species.module.css";

import type { Species } from "src/models/origin/species";

type StepSpeciesProps = {
  race: Species | null;
  onRaceChange: (race: Species) => void;
};

export function StepSpecies({ race, onRaceChange }: StepSpeciesProps) {
  const details = race ? species.get(race) : null;

  return (
    <>
      <Section title="Species">
        <ChipGrid
          actions={species.list().map(({ id, details }) => ({
            key: id,
            label: details.label,
            icon: details.icon,
          }))}
          selectedKey={race}
          onSelect={(key) => onRaceChange(key as Species)}
          iconSize="large"
        />
      </Section>

      {details && race && (
        <DetailsPanel
          icon={details.icon}
          iconAlt={race}
          name={details.label}
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
