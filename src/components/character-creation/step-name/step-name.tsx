import styles from "./step-name.module.css";

type StepNameProps = {
  name: string;
  onNameChange: (name: string) => void;
};

export function StepName({ name, onNameChange }: StepNameProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Character name"
        className={styles.nameInput}
      />
    </div>
  );
}
