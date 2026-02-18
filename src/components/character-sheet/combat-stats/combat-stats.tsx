import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { formatModifier } from "src/models/abilities";
import { resolveIconPath } from "src/models/icons";
import { Section } from "src/components/section";
import styles from "./combat-stats.module.css";

import type { StatResult } from "src/models/character-stats";

type CombatStatsKey = "initiative" | "ac" | "spell";

type CombatStatsProps = {
  initiative: StatResult;
  ac: StatResult;
  spellAttack: StatResult | null;
};

const INITIATIVE_ICON = resolveIconPath("vol2/icon-vol2_150");
const AC_ICON = resolveIconPath("vol1/icon-vol1_29");
const SPELL_ICON = resolveIconPath("vol10/icon-vol10_113");

export function CombatStats({ initiative, ac, spellAttack }: CombatStatsProps) {
  const { expandedKey, toggle } = useExpandable<CombatStatsKey>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedKey);

  function setRef(key: CombatStatsKey) {
    return (el: HTMLButtonElement | null) => {
      if (el) buttonRefs.current.set(key, el);
      else buttonRefs.current.delete(key);
    };
  }

  const expandedLines =
    expandedKey === "initiative"
      ? initiative.lines
      : expandedKey === "ac"
        ? ac.lines
        : expandedKey === "spell" && spellAttack
          ? spellAttack.lines
          : null;

  return (
    <Section title="Combat Stats">
      <div className={styles.row}>
        <button
          ref={setRef("initiative")}
          type="button"
          className={`${styles.chip}${expandedKey === "initiative" ? ` ${styles.highlighted}` : ""}`}
          onClick={() => toggle("initiative")}
          aria-expanded={expandedKey === "initiative"}
        >
          <span className={styles.chipLabel}>Initiative</span>
          <img src={INITIATIVE_ICON} alt="Initiative" className={styles.icon} />
          <span className={styles.value}>
            {formatModifier(initiative.total)}
          </span>
        </button>

        <button
          ref={setRef("ac")}
          type="button"
          className={`${styles.chip}${expandedKey === "ac" ? ` ${styles.highlighted}` : ""}`}
          onClick={() => toggle("ac")}
          aria-expanded={expandedKey === "ac"}
        >
          <span className={styles.chipLabel}>AC</span>
          <img src={AC_ICON} alt="Armor Class" className={styles.icon} />
          <span className={styles.value}>{ac.total}</span>
        </button>

        <button
          ref={setRef("spell")}
          type="button"
          className={`${styles.chip}${expandedKey === "spell" ? ` ${styles.highlighted}` : ""}${!spellAttack ? ` ${styles.inactive}` : ""}`}
          onClick={() => {
            if (spellAttack) toggle("spell");
          }}
          aria-expanded={expandedKey === "spell"}
          aria-disabled={!spellAttack}
        >
          <span className={styles.chipLabel}>Spell Attack</span>
          <img src={SPELL_ICON} alt="Spell Attack" className={styles.icon} />
          <span className={styles.value}>
            {spellAttack ? formatModifier(spellAttack.total) : "—"}
          </span>
        </button>
      </div>

      {expandedLines && (
        <div className={styles.breakdown}>
          <span
            className={styles.breakdownArrow}
            style={{ left: `${arrowOffset}px` }}
          />
          <dl className={styles.breakdownList}>
            {expandedLines.map((line) => (
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
