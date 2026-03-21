import c from "classnames";
import { useId } from "react";
import styles from "./section.module.css";

import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  /** Amber accent variant — same double-frame structure, visually highlighted */
  accent?: boolean;
};

export function Section({ title, children, accent = false }: SectionProps) {
  const titleId = useId();

  return (
    <section
      className={c(styles.section, accent && styles.sectionAccent)}
      aria-labelledby={titleId}
    >
      <h2
        id={titleId}
        className={c(styles.sectionTitle, accent && styles.sectionTitleAccent)}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
