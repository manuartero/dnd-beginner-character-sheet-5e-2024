import descriptionPopoverStyles from "src/components/description-popover/description-popover.module.css";
import { getIconPath } from "src/models/icons";
import styles from "./action-button.module.css";

import type { IconName } from "src/models/icons";

type ActionButtonProps = {
  name: string;
  description: string;
  icon?: string;
  isExpanded: boolean;
  arrowOffset: number;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
};

export function ActionButton({
  name,
  description,
  icon,
  isExpanded,
  arrowOffset,
  buttonRef,
  onClick,
}: ActionButtonProps) {
  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isExpanded}
        onClick={onClick}
        className={`${styles.actionButton}${isExpanded ? ` ${styles.highlighted}` : ""}`}
      >
        {icon && (
          <img
            src={getIconPath(icon as IconName)}
            alt={name}
            className={styles.icon}
          />
        )}
        <span className={styles.actionLabel}>{name}</span>
      </button>
      {isExpanded && (
        <div className={descriptionPopoverStyles.descriptionRow}>
          <span
            className={descriptionPopoverStyles.descriptionArrow}
            style={{ left: `${arrowOffset}px` }}
          />
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </>
  );
}
