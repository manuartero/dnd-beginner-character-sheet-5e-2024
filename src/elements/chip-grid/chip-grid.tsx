import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { getIconPath } from "src/models/icons";
import { ActionChip } from "../action-chip/action-chip";
import actionChipStyles from "../action-chip/action-chip.module.css";
import styles from "./chip-grid.module.css";

import type { IconName } from "src/models/icons";

type GridAction = {
  name: string;
  description: string;
  icon?: string;
  disabled?: boolean;
  renderExpanded?: () => React.ReactNode;
};

type ChipGridProps = {
  actions: GridAction[];
};

export type { GridAction };

export function ChipGrid({ actions }: ChipGridProps) {
  const { expandedKey: expandedAction, toggle: toggleAction } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedAction);

  return (
    <div className={styles.actionsGrid}>
      {actions.map((action) => (
        <ActionChip
          key={action.name}
          label={action.name}
          iconSrc={
            action.icon ? getIconPath(action.icon as IconName) : undefined
          }
          isInactive={action.disabled}
          isExpanded={expandedAction === action.name}
          arrowOffset={arrowOffset}
          buttonRef={(el) => {
            if (el) buttonRefs.current.set(action.name, el);
            else buttonRefs.current.delete(action.name);
          }}
          onClick={() => toggleAction(action.name)}
        >
          {action.renderExpanded?.() ?? (
            <p className={actionChipStyles.description}>{action.description}</p>
          )}
        </ActionChip>
      ))}
    </div>
  );
}
