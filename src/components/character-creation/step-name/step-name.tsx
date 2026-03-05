import { Section } from "elements";
import styles from "./step-name.module.css";

type StepNameProps = {
  name: string;
  onNameChange: (name: string) => void;
};

export function StepName({ name, onNameChange }: StepNameProps) {
  return (
    <Section title="Name">
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Character name"
        aria-label="Character name"
        className={styles.nameInput}
      />
    </Section>
  );
}
