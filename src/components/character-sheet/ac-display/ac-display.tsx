import { useState } from "react";
import { Section } from "src/components/section";
import { resolveIconPath } from "src/models/icons";
import styles from "./ac-display.module.css";

import type { AcBreakdownLine } from "src/models/compute-ac";

type AcDisplayProps = {
  total: number;
  lines: AcBreakdownLine[];
};

const AC_ICON = resolveIconPath("vol1/icon-vol1_29");

export function AcDisplay({ total, lines }: AcDisplayProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section title="Armor Class">
      <button
        type="button"
        className={`${styles.acButton}${expanded ? ` ${styles.highlighted}` : ""}`}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <img src={AC_ICON} alt="Shield" className={styles.icon} />
        <span className={styles.acValue}>{total}</span>
      </button>

      {expanded && (
        <div className={styles.breakdown}>
          <span className={styles.breakdownArrow} />
          <dl className={styles.breakdownList}>
            {lines.map((line) => (
              <div key={line.label} className={styles.breakdownRow}>
                <dt className={styles.breakdownLabel}>{line.label}</dt>
                <dd className={styles.breakdownValue}>{line.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </Section>
  );
}
