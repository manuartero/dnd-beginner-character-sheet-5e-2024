import styles from "./empty-slot.module.css";

type EmptySlotProps = {
  label: string;
};

export function EmptySlot({ label }: EmptySlotProps) {
  return (
    <section className={styles.slot} aria-label={label}>
      <span className={styles.label}>{label}</span>
    </section>
  );
}
