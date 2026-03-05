import c from "classnames";
import { getIconPath } from "src/models/icons";
import descriptionPopoverStyles from "../description-popover/description-popover.module.css";
import styles from "./action-button.module.css";

import type { IconName } from "src/models/icons";

type ActionButtonProps = {
  name: string;
  description: string;
  icon?: string;
  disabled?: boolean;
  renderExpanded?: () => React.ReactNode;
  isExpanded?: boolean;
  arrowOffset: number;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
};

/**
 * ActionButton — labelled button that expands an inline description popover
 *
 *  [attack] [dodge] [help]
 *      |
 *      +--- arrow points to the expanded button (arrowOffset px from grid left)
 *
 *  +--------------------------------+
 *  | Make one melee or ranged attack.|
 *  +--------------------------------+
 *
 *  When `renderExpanded` is provided, it replaces the default description text.
 *  buttonRef + arrowOffset are wired by useArrowOffset in the parent.
 */
export function ActionButton({
  name,
  description,
  icon,
  disabled = false,
  renderExpanded,
  isExpanded = false,
  arrowOffset,
  buttonRef,
  onClick,
}: ActionButtonProps) {
  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-expanded={isExpanded}
        onClick={onClick}
        className={c(
          styles.actionButton,
          isExpanded && styles.highlighted,
          disabled && styles.disabled,
        )}
      >
        <span className={styles.actionLabel}>{name}</span>
        {icon && (
          <img
            src={getIconPath(icon as IconName)}
            alt={name}
            className={styles.icon}
          />
        )}
      </button>
      {isExpanded && (
        <div className={descriptionPopoverStyles.descriptionRow}>
          <span
            className={descriptionPopoverStyles.descriptionArrow}
            style={{ left: `${arrowOffset}px` }}
          />
          {renderExpanded?.()}
          {!renderExpanded && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      )}
    </>
  );
}
