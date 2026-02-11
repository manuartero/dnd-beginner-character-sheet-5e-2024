import { getClassIcon } from "src/data/class-icons";
import type { CharacterClass } from "src/data/classes";
import { CLASS_LIST } from "src/data/classes";
import { SelectionGrid } from "../selection-grid";
import styles from "./step-class.module.css";

type StepClassProps = {
  characterClass: CharacterClass | null;
  onClassChange: (characterClass: CharacterClass) => void;
};

export function StepClass({ characterClass, onClassChange }: StepClassProps) {
  return (
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
  );
}
