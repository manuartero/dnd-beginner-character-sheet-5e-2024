import { ActionButton } from "src/components/action-button/action-button";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import styles from "./action-button-grid.module.css";

type GridAction = {
  name: string;
  description: string;
  icon?: string;
};

type ActionButtonGridProps = {
  actions: GridAction[];
};

export function ActionButtonGrid({ actions }: ActionButtonGridProps) {
  const { expandedKey: expandedAction, toggle: toggleAction } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedAction);

  return (
    <div className={styles.actionsGrid}>
      {actions.map((action) => (
        <ActionButton
          key={action.name}
          name={action.name}
          description={action.description}
          icon={action.icon}
          isExpanded={expandedAction === action.name}
          arrowOffset={arrowOffset}
          buttonRef={(el) => {
            if (el) buttonRefs.current.set(action.name, el);
            else buttonRefs.current.delete(action.name);
          }}
          onClick={() => toggleAction(action.name)}
        />
      ))}
    </div>
  );
}
