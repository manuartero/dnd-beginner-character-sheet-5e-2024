import styles from "./empty-slot.module.css";

type EmptySlotProps = {
  label: string;
};

export function EmptySlot({ label }: EmptySlotProps) {
  return (
    <div className={styles.slot}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
