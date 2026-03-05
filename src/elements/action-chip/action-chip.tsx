import c from "classnames";
import styles from "./action-chip.module.css";
import descriptionPopoverStyles from "./description-popover.module.css";

import type { ReactNode } from "react";

type IconSize = "default" | "large";

type ActionChipProps = {
  label: string;
  iconSrc?: string;
  iconSize?: IconSize;
  value?: string;
  isSelected?: boolean;
  isInactive?: boolean;
  buttonRef?: (el: HTMLButtonElement | null) => void;
  onClick?: () => void;
  arrowOffset?: number;
  children?: ReactNode;
};

export type { ActionChipProps };

export function ActionChip({
  label,
  iconSrc,
  iconSize = "default",
  value,
  isSelected = false,
  isInactive = false,
  buttonRef,
  onClick,
  arrowOffset = 0,
  children,
}: ActionChipProps) {
  const hasPopover = !!children;
  const isSvgIcon = iconSrc?.toLowerCase().endsWith(".svg") ?? false;
  const chipClass = c(
    styles.actionChip,
    !value && styles.compact,
    isSelected && styles.highlighted,
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
        aria-expanded={hasPopover ? isSelected : undefined}
        aria-pressed={!hasPopover ? isSelected : undefined}
        data-sound="select"
      >
        <span className={styles.label}>{label}</span>
        {iconSrc &&
          (isSvgIcon ? (
            <span
              role="img"
              aria-hidden
              className={c(
                styles.icon,
                iconSize === "large" && styles.iconLarge,
              )}
              style={{
                maskImage: `url(${iconSrc})`,
                WebkitMaskImage: `url(${iconSrc})`,
              }}
            />
          ) : (
            <img
              src={iconSrc}
              alt=""
              aria-hidden
              className={c(
                styles.iconImage,
                iconSize === "large" && styles.iconImageLarge,
              )}
            />
          ))}
        {value && <span className={styles.value}>{value}</span>}
      </button>
      {isSelected && children && (
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
