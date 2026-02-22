import c from "classnames";
import styles from "./selection-grid.module.css";

type SelectionItem = {
  key: string;
  label: string;
  icon: string;
};

type IconSize = "default" | "large";

type SelectionGridProps = {
  items: SelectionItem[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  iconSize?: IconSize;
};

export function SelectionGrid({
  items,
  selectedKey,
  onSelect,
  iconSize = "default",
}: SelectionGridProps) {
  return (
    <div className={c(styles.grid, iconSize === "large" && styles.gridLarge)}>
      {items.map(({ key, label, icon }) => (
        <button
          key={key}
          type="button"
          data-sound="select"
          aria-pressed={selectedKey === key}
          className={c(styles.card, selectedKey === key && styles.cardSelected)}
          onClick={() => onSelect(key)}
        >
          <img
            src={icon}
            alt=""
            aria-hidden
            className={c(
              styles.cardIcon,
              iconSize === "large" && styles.cardIconLarge,
            )}
          />
          <span className={styles.cardLabel}>{label}</span>
        </button>
      ))}
    </div>
  );
}
