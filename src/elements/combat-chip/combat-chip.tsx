import styles from "./combat-chip.module.css";

export type CombatChipProps = {
  label: string;
  iconSrc: string;
  iconAlt: string;
  value: string;
  isExpanded: boolean;
  isInactive?: boolean;
  controlsId?: string;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
};

export function CombatChip({
  label,
  iconSrc,
  iconAlt,
  value,
  isExpanded,
  isInactive,
  controlsId,
  buttonRef,
  onClick,
}: CombatChipProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.chip}${isExpanded ? ` ${styles.highlighted}` : ""}${isInactive ? ` ${styles.inactive}` : ""}`}
      onClick={onClick}
      disabled={isInactive}
      aria-label={`${label}: ${value}`}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
    >
      <span className={styles.chipLabel}>{label}</span>
      <img src={iconSrc} alt={iconAlt} className={styles.icon} />
      <span className={styles.value}>{value}</span>
    </button>
  );
}
