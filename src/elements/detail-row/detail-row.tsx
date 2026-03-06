import styles from "./detail-row.module.css";

import type { ReactNode } from "react";

type DetailRowProps = {
  label: string;
  children: ReactNode;
};

export function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span>{children}</span>
    </div>
  );
}
