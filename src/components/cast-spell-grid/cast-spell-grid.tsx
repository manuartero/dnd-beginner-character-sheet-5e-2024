import c from "classnames";
import { useExpandable } from "src/hooks/use-expandable";
import { resolveIconPath } from "src/models/icons";
import styles from "./cast-spell-grid.module.css";

import type { Spell } from "src/models/spells";

type CastSpellGridProps = {
  spells: Spell[];
};

const DAMAGE_COLOR = "var(--color-highlight)";

/**
 * Inline spell sub-grid rendered inside the "Cast a Spell" action button
 * expansion area. Groups spells by level (cantrips vs leveled) and lets
 * the user expand individual spells to see details.
 */
export function CastSpellGrid({ spells }: CastSpellGridProps) {
  const { expandedKey, toggle } = useExpandable<string>();

  const cantrips = spells.filter((s) => s.level === 0);
  const levelSpells = spells.filter((s) => s.level > 0);

  return (
    <div className={styles.container}>
      {cantrips.length > 0 && (
        <SpellGroup
          label="Cantrips (unlimited)"
          spells={cantrips}
          expandedId={expandedKey}
          onToggle={toggle}
        />
      )}
      {levelSpells.length > 0 && (
        <SpellGroup
          label="Level 1"
          spells={levelSpells}
          expandedId={expandedKey}
          onToggle={toggle}
        />
      )}
    </div>
  );
}

type SpellGroupProps = {
  label: string;
  spells: Spell[];
  expandedId: string | null;
  onToggle: (id: string) => void;
};

function SpellGroup({ label, spells, expandedId, onToggle }: SpellGroupProps) {
  return (
    <div className={styles.group}>
      <h4 className={styles.groupLabel}>{label}</h4>
      <div className={styles.spellList}>
        {spells.map((spell) => (
          <SpellEntry
            key={spell.id}
            spell={spell}
            isExpanded={expandedId === spell.id}
            onToggle={() => onToggle(spell.id)}
          />
        ))}
      </div>
    </div>
  );
}

type SpellEntryProps = {
  spell: Spell;
  isExpanded: boolean;
  onToggle: () => void;
};

function SpellEntry({ spell, isExpanded, onToggle }: SpellEntryProps) {
  const result = formatSpellResult(spell);
  const resultColor = spell.damage ? DAMAGE_COLOR : undefined;

  return (
    <button
      type="button"
      className={c(styles.entry, isExpanded && styles.entryExpanded)}
      aria-expanded={isExpanded}
      onClick={onToggle}
    >
      <div className={styles.entryHeader}>
        {spell.icon && (
          <img
            src={resolveIconPath(spell.icon)}
            alt=""
            className={styles.icon}
          />
        )}
        <span className={styles.spellName}>{spell.name}</span>
        {result && (
          <span className={styles.resultBadge} style={{ color: resultColor }}>
            {result}
          </span>
        )}
      </div>

      {isExpanded && (
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Range</span>
            <span>{spell.range}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Casting</span>
            <span>{spell.castingTime}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Duration</span>
            <span>{spell.duration}</span>
          </div>
          {spell.save && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Save</span>
              <span>{spell.save}</span>
            </div>
          )}
          {spell.damage && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Damage</span>
              <span>
                {spell.damage.dice} {spell.damage.type}
              </span>
            </div>
          )}
          {spell.concentration && (
            <span className={styles.keyword}>Concentration</span>
          )}
          <p className={styles.description}>{spell.description}</p>
        </div>
      )}
    </button>
  );
}

function formatSpellResult(spell: Spell): string {
  const damagePart = spell.damage
    ? `${spell.damage.dice} ${spell.damage.type}`
    : "";
  const savePart = spell.save ? spell.save.replace(/\+/g, "").trim() : "";

  if (damagePart && savePart) {
    return `${damagePart} • ${savePart}`;
  }
  return damagePart || savePart;
}
