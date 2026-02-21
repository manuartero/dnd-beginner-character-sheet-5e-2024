import { useId } from "react";
import { CombatChip } from "src/components/combat-chip/combat-chip";
import { Section } from "src/components/section";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { formatModifier } from "src/models/abilities";
import { resolveIconPath } from "src/models/icons";
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
  const breakdownId = useId();

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
  const expandedLabel =
    expandedKey === "initiative"
      ? "Initiative"
      : expandedKey === "ac"
        ? "AC"
        : expandedKey === "spell"
          ? "Spell Attack"
          : null;

  return (
    <Section title="Combat Stats">
      <div className={styles.row}>
        <CombatChip
          label="Initiative"
          iconSrc={INITIATIVE_ICON}
          iconAlt="Initiative"
          value={formatModifier(initiative.total)}
          isExpanded={expandedKey === "initiative"}
          controlsId={breakdownId}
          buttonRef={setRef("initiative")}
          onClick={() => toggle("initiative")}
        />
        <CombatChip
          label="AC"
          iconSrc={AC_ICON}
          iconAlt="Armor Class"
          value={String(ac.total)}
          isExpanded={expandedKey === "ac"}
          controlsId={breakdownId}
          buttonRef={setRef("ac")}
          onClick={() => toggle("ac")}
        />
        <CombatChip
          label="Spell Attack"
          iconSrc={SPELL_ICON}
          iconAlt="Spell Attack"
          value={spellAttack ? formatModifier(spellAttack.total) : "—"}
          isExpanded={expandedKey === "spell"}
          isInactive={!spellAttack}
          controlsId={breakdownId}
          buttonRef={setRef("spell")}
          onClick={() => {
            if (spellAttack) toggle("spell");
          }}
        />
      </div>

      {expandedLines && (
        <section
          id={breakdownId}
          aria-label={`${expandedLabel} breakdown`}
          className={styles.breakdown}
        >
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
        </section>
      )}
    </Section>
  );
}
