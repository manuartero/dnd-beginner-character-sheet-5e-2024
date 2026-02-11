import type { IconName } from "src/data/icons";
import { getIconPath } from "src/data/icons";
import type { Spell } from "src/data/types";
import { useExpandable } from "src/hooks/use-expandable";
import styles from "./spell-cards.module.css";

type SpellCardsProps = {
  spells: Spell[];
};

const DAMAGE_COLORS: Record<string, string> = {
  fire: "var(--color-fire)",
  cold: "var(--color-cold)",
  lightning: "var(--color-lightning)",
  necrotic: "var(--color-necrotic)",
  radiant: "var(--color-radiant)",
  force: "var(--color-force)",
  poison: "var(--color-poison)",
  thunder: "var(--color-lightning)",
  acid: "var(--color-poison)",
  psychic: "var(--color-necrotic)",
};

export function SpellCards({ spells }: SpellCardsProps) {
  const { expandedKey: expandedSpell, toggle: toggleSpell } =
    useExpandable<string>();

  const cantrips = spells.filter((s) => s.level === 0);
  const levelSpells = spells.filter((s) => s.level > 0);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Spells</h2>

      {cantrips.length > 0 && (
        <div className={styles.spellGroup}>
          <h3 className={styles.groupLabel}>Cantrips</h3>
          <div className={styles.cardsGrid}>
            {cantrips.map((spell) => (
              <SpellCard
                key={spell.name}
                spell={spell}
                isExpanded={expandedSpell === spell.name}
                onToggle={() => toggleSpell(spell.name)}
              />
            ))}
          </div>
        </div>
      )}

      {levelSpells.length > 0 && (
        <div className={styles.spellGroup}>
          <h3 className={styles.groupLabel}>Level 1</h3>
          <div className={styles.cardsGrid}>
            {levelSpells.map((spell) => (
              <SpellCard
                key={spell.name}
                spell={spell}
                isExpanded={expandedSpell === spell.name}
                onToggle={() => toggleSpell(spell.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type SpellCardProps = {
  spell: Spell;
  isExpanded: boolean;
  onToggle: () => void;
};

function SpellCard({ spell, isExpanded, onToggle }: SpellCardProps) {
  const damageColor = spell.damage
    ? (DAMAGE_COLORS[spell.damage.type] ?? "var(--color-text)")
    : undefined;

  return (
    <button type="button" onClick={onToggle} className={styles.card}>
      <div className={styles.cardHeader}>
        {spell.icon && (
          <img
            src={getIconPath(spell.icon as IconName)}
            alt={spell.name}
            className={styles.icon}
          />
        )}
        <div className={styles.cardInfo}>
          <span className={styles.spellName}>{spell.name}</span>
          <span className={styles.spellMeta}>{spell.range}</span>
        </div>
      </div>

      {spell.damage && (
        <div className={styles.damageBadge} style={{ color: damageColor }}>
          {spell.damage.dice} {spell.damage.type}
        </div>
      )}

      {isExpanded && (
        <div className={styles.expanded}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Casting</span>
            <span>{spell.castingTime}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Duration</span>
            <span>{spell.duration}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Components</span>
            <span>{spell.components}</span>
          </div>
          <p className={styles.descriptionText}>{spell.description}</p>
        </div>
      )}
    </button>
  );
}
