import c from "classnames";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { ActionChip } from "../action-chip/action-chip";
import actionChipStyles from "../action-chip/action-chip.module.css";
import styles from "./chip-grid.module.css";

type GridAction = {
  key: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  renderExpanded?: () => React.ReactNode;
};

type IconSize = "default" | "large";

type ChipGridProps = {
  actions: GridAction[];
  selectedKey?: string | null;
  onSelect?: (key: string) => void;
  iconSize?: IconSize;
};

export type { GridAction };

export function ChipGrid({
  actions,
  selectedKey: controlledKey,
  onSelect,
  iconSize,
}: ChipGridProps) {
  const { expandedKey: internalKey, toggle: toggleInternal } =
    useExpandable<string>();

  const selectedKey = onSelect ? (controlledKey ?? null) : internalKey;
  const handleSelect = onSelect ?? toggleInternal;

  const { buttonRefs, arrowOffset } = useArrowOffset(selectedKey);

  const gridClass = c(
    styles.actionsGrid,
    iconSize === "large" && styles.actionsGridLarge,
  );

  return (
    <div className={gridClass}>
      {actions.map((action) => {
        const hasContent = !!(action.renderExpanded || action.description);

        return (
          <ActionChip
            key={action.key}
            label={action.label}
            iconSrc={action.icon}
            iconSize={iconSize}
            isInactive={action.disabled}
            isSelected={selectedKey === action.key}
            arrowOffset={arrowOffset}
            buttonRef={(el) => {
              if (el) buttonRefs.current.set(action.key, el);
              else buttonRefs.current.delete(action.key);
            }}
            onClick={() => handleSelect(action.key)}
          >
            {hasContent &&
              (action.renderExpanded?.() ?? (
                <p className={actionChipStyles.description}>
                  {action.description}
                </p>
              ))}
          </ActionChip>
        );
      })}
    </div>
  );
}
