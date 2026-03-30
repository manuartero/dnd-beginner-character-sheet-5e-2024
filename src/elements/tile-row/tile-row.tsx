import c from "classnames";
import styles from "./tile-row.module.css";

export type TileItem = {
  key: string;
  label: string;
  selected?: boolean;
  dimmed?: boolean;
  badge?: string;
};

type TileRowProps = {
  items: TileItem[];
  onPick?: (key: string) => void;
  onUnpick?: (key: string) => void;
  columns?: number;
};

export function TileRow({ items, onPick, columns, onUnpick }: TileRowProps) {
  const interactive = !!onPick;
  const style = columns
    ? { display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)` }
    : undefined;

  if (!interactive) {
    return (
      <div role="list" className={styles.tileRow} style={style}>
        {items.map((item) => (
          <span
            key={item.key}
            role="listitem"
            className={c(
              styles.tile,
              item.selected && styles.tileSelected,
              item.dimmed && styles.tileDimmed,
            )}
          >
            {item.label}
            {item.badge && (
              <span className={styles.tileBadge}>{item.badge}</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.tileRow} style={style}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-label={item.badge ? `${item.label} ${item.badge}` : item.label}
          aria-pressed={item.selected ?? false}
          aria-disabled={item.dimmed}
          className={c(
            styles.tile,
            item.selected && styles.tileSelected,
            item.dimmed && styles.tileDimmed,
          )}
          onClick={() => !item.dimmed && onPick(item.key)}
          onContextMenu={(e) => {
            if (!item.dimmed && onUnpick) {
              e.preventDefault();
              onUnpick(item.key);
            }
          }}
        >
          {item.label}
          {item.badge && (
            <span className={styles.tileBadge}>{item.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
