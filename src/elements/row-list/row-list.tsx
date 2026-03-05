import styles from "./row-list.module.css";

import type { ReactNode } from "react";

export { styles as rowListStyles };

type RowListItem<T> = {
  index: number;
  item: T;
};

type RowListProps<T> = {
  title: string;
  ariaLabel: string;
  items: RowListItem<T>[];
  renderItem: (item: T, index: number) => ReactNode;
};

export function RowList<T>({
  title,
  ariaLabel,
  items,
  renderItem,
}: RowListProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list} aria-label={ariaLabel}>
        {items.map(({ item, index }) => (
          <li key={index} className={styles.row}>
            {renderItem(item, index)}
          </li>
        ))}
      </ul>
    </div>
  );
}
