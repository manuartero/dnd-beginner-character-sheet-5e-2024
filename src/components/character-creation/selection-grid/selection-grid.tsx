import c from "classnames";
import cardStyles from "src/components/character-creation/card.module.css";

type IconSize = "default" | "large";

const ICON_SIZES: Record<IconSize, number> = {
  default: 64,
  large: 96,
};

type SelectionGridProps = {
  items: { key: string; label: string }[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  columns: number;
  getIcon: (key: string) => string;
  iconSize?: IconSize;
};

export function SelectionGrid({
  items,
  selectedKey,
  onSelect,
  columns,
  getIcon,
  iconSize = "default",
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
          data-sound="select"
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
            style={
              iconSize
                ? {
                    width: ICON_SIZES[iconSize],
                    height: ICON_SIZES[iconSize],
                  }
                : undefined
            }
          />
          <span className={cardStyles.cardLabel}>{label}</span>
        </button>
      ))}
    </div>
  );
}
