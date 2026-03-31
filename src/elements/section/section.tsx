import c from "classnames";
import { useId } from "react";
import styles from "./section.module.css";

import type { ReactNode } from "react";

type SectionVariant = "accent" | "white-bg";

type SectionProps = {
  title: string;
  children: ReactNode;
  variant?: SectionVariant;
};

export function Section({ title, children, variant }: SectionProps) {
  const titleId = useId();

  return (
    <section
      className={c(
        styles.section,
        variant === "accent" && styles.sectionAccent,
        variant === "white-bg" && styles.sectionWhite,
      )}
      aria-labelledby={titleId}
    >
      <h2
        id={titleId}
        className={c(
          styles.sectionTitle,
          variant === "accent" && styles.sectionTitleAccent,
        )}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
