import styles from "./detail-row.module.css";

import type { ReactNode } from "react";

type DetailRowProps = {
  label: string;
  children: ReactNode;
};

export function DetailRow({ label, children }: DetailRowProps) {
  return (
    <dl className={styles.row}>
      <dt className={styles.label}>{label}</dt>
      <dd>{children}</dd>
    </dl>
  );
}
