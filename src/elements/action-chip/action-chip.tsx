import c from "classnames";
import descriptionPopoverStyles from "../description-popover/description-popover.module.css";
import styles from "./action-chip.module.css";

import type { ReactNode } from "react";

type ActionChipProps = {
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  value?: string;
  isExpanded?: boolean;
  isInactive?: boolean;
  controlsId?: string;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
  arrowOffset?: number;
  children?: ReactNode;
};

export type { ActionChipProps };

export function ActionChip({
  label,
  iconSrc,
  iconAlt,
  value,
  isExpanded = false,
  isInactive = false,
  controlsId,
  buttonRef,
  onClick,
  arrowOffset = 0,
  children,
}: ActionChipProps) {
  const chipClass = c(
    styles.actionChip,
    !value && styles.compact,
    isExpanded && styles.highlighted,
    isInactive && styles.inactive,
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={chipClass}
        onClick={onClick}
        disabled={isInactive}
        aria-label={value ? `${label}: ${value}` : undefined}
        aria-expanded={isExpanded}
        aria-controls={controlsId}
      >
        <span className={styles.label}>{label}</span>
        {iconSrc && (
          <img src={iconSrc} alt={iconAlt ?? label} className={styles.icon} />
        )}
        {value && <span className={styles.value}>{value}</span>}
      </button>
      {isExpanded && children && (
        <div className={descriptionPopoverStyles.descriptionRow}>
          <span
            className={descriptionPopoverStyles.descriptionArrow}
            style={{ left: `${arrowOffset}px` }}
          />
          {children}
        </div>
      )}
    </>
  );
}
