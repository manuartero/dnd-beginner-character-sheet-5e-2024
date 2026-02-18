import { Section } from "src/components/section";
import { useExpandable } from "src/hooks/use-expandable";
import { getIconPath } from "src/models/icons";
import styles from "./spell-cards.module.css";

import type { IconName } from "src/models/icons";
import type { Spell } from "src/models/spells";

type SpellCardsProps = {
  spells: Spell[];
};

const DAMAGE_COLOR = "var(--color-highlight)";

export function SpellCards({ spells }: SpellCardsProps) {
  const { expandedKey: expandedSpell, toggle: toggleSpell } =
    useExpandable<string>();

  const cantrips = spells.filter((s) => s.level === 0);
  const levelSpells = spells.filter((s) => s.level > 0);

  return (
    <Section title="Spells">
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
    </Section>
  );
}

type SpellCardProps = {
  spell: Spell;
  isExpanded: boolean;
  onToggle: () => void;
};

function SpellCard({ spell, isExpanded, onToggle }: SpellCardProps) {
  const damageColor = spell.damage ? DAMAGE_COLOR : undefined;

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
