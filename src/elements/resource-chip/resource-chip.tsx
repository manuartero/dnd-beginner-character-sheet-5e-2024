import c from "classnames";
import styles from "./resource-chip.module.css";

export type ResourceChipProps = {
  iconSrc: string;
  label: string;
  isReady: boolean;
  isDraining?: boolean;
  ariaLabel: string;
  onClick?: () => void;
};

export function ResourceChip({
  iconSrc,
  label,
  isReady,
  isDraining = false,
  ariaLabel,
  onClick,
}: ResourceChipProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={!isReady}
      className={c(
        styles.chip,
        !isReady && styles.chipSpent,
        isDraining && styles.chipDraining,
      )}
      onClick={onClick}
    >
      <span
        role="img"
        aria-hidden
        className={styles.chipIcon}
        style={{
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
        }}
      />
      <span className={styles.chipLabel}>{label}</span>
    </button>
  );
}
