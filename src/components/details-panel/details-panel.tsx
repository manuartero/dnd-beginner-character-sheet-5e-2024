import styles from "./details-panel.module.css";

import type { ReactNode } from "react";

type DetailsPanelProps = {
  icon: string;
  iconAlt: string;
  name: string;
  description: string;
  children: ReactNode;
};

export function DetailsPanel({
  icon,
  iconAlt,
  name,
  description,
  children,
}: DetailsPanelProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.header}>
        <img src={icon} alt={iconAlt} className={styles.icon} />
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <dl className={styles.details}>{children}</dl>
    </article>
  );
}
