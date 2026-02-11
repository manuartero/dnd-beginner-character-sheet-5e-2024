import { getClassIcon } from "src/data/class-icons";
import { CLASS_LIST } from "src/data/classes";
import { RACE_LIST } from "src/data/races";
import type { CharacterClass, CharacterRace } from "src/data/types";
import { SelectionGrid } from "../selection-grid";
import styles from "./step-identity.module.css";

type StepIdentityProps = {
  name: string;
  characterClass: CharacterClass | null;
  race: CharacterRace | null;
  onNameChange: (name: string) => void;
  onClassChange: (characterClass: CharacterClass) => void;
  onRaceChange: (race: CharacterRace) => void;
};

export function StepIdentity({
  name,
  characterClass,
  race,
  onNameChange,
  onClassChange,
  onRaceChange,
}: StepIdentityProps) {
  return (
    <>
      <div className="section">
        <h2 className="section-title">Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Character name"
          className={styles.nameInput}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Class</h2>
        <SelectionGrid
          items={CLASS_LIST}
          selectedKey={characterClass}
          onSelect={(key) => onClassChange(key as CharacterClass)}
          columns={3}
          getIcon={(key) => getClassIcon(key as CharacterClass)}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Species</h2>
        <SelectionGrid
          items={RACE_LIST}
          selectedKey={race}
          onSelect={(key) => onRaceChange(key as CharacterRace)}
          columns={2}
          getIcon={() => "/race-icons/placeholder.png"}
        />
      </div>
    </>
  );
}
