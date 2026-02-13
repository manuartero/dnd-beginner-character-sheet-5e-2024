import c from "classnames";
import cardStyles from "../card.module.css";

type SelectionGridProps = {
  items: { key: string; label: string }[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  columns: number;
  getIcon: (key: string) => string;
  iconSize?: number;
};

export function SelectionGrid({
  items,
  selectedKey,
  onSelect,
  columns,
  getIcon,
  iconSize,
}: SelectionGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "var(--space-sm)",
      }}
    >
      {items.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={c(
            cardStyles.card,
            selectedKey === key && cardStyles.cardSelected,
          )}
          onClick={() => onSelect(key)}
        >
          <img
            src={getIcon(key)}
            alt={label}
            className={cardStyles.cardIcon}
            style={iconSize ? { width: iconSize, height: iconSize } : undefined}
          />
          <span className={cardStyles.cardLabel}>{label}</span>
        </button>
      ))}
    </div>
  );
}
