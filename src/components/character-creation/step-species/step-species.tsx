import type { CharacterRace } from "src/data/races";
import { RACE_LIST } from "src/data/races";
import { SelectionGrid } from "../selection-grid";
import styles from "./step-species.module.css";

type StepSpeciesProps = {
  race: CharacterRace | null;
  onRaceChange: (race: CharacterRace) => void;
};

export function StepSpecies({ race, onRaceChange }: StepSpeciesProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Species</h2>
      <SelectionGrid
        items={RACE_LIST}
        selectedKey={race}
        onSelect={(key) => onRaceChange(key as CharacterRace)}
        columns={2}
        getIcon={() => "/race-icons/placeholder.png"}
      />
    </div>
  );
}
