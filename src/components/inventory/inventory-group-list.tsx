import styles from "./inventory-group-list.module.css";

import type { ReactNode } from "react";

type InventoryGroupItem<T> = {
  index: number;
  item: T;
};

type InventoryGroupListProps<T> = {
  title: string;
  ariaLabel: string;
  items: InventoryGroupItem<T>[];
  renderItem: (item: T, index: number) => ReactNode;
};

export function InventoryGroupList<T>({
  title,
  ariaLabel,
  items,
  renderItem,
}: InventoryGroupListProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.subsection}>
      <h3 className={styles.subsectionLabel}>{title}</h3>
      <ul className={styles.itemList} aria-label={ariaLabel}>
        {items.map(({ item, index }) => (
          <li key={index} className={styles.itemRow}>
            {renderItem(item, index)}
          </li>
        ))}
      </ul>
    </div>
  );
}
