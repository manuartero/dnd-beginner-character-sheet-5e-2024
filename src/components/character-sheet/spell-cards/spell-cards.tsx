import { Section } from "src/components/section";
import { useExpandable } from "src/hooks/use-expandable";
import { resolveIconPath } from "src/models/icons";
import styles from "./spell-cards.module.css";

import type { Spell } from "src/models/spells";

type SpellCardsProps = {
  spells: Spell[];
  title?: string;
  stagedSpellIds?: string[];
  onStagedSpellClick?: (spell: Spell) => void;
};

const DAMAGE_COLOR = "var(--color-highlight)";

export function SpellCards({
  spells,
  title = "Spells",
  stagedSpellIds = [],
  onStagedSpellClick,
}: SpellCardsProps) {
  const { expandedKey: expandedSpell, toggle: toggleSpell } =
    useExpandable<string>();
  const stagedIds = new Set(stagedSpellIds);

  const cantrips = spells.filter((s) => s.level === 0);
  const levelSpells = spells.filter((s) => s.level > 0);

  const content = (
    <>
      {cantrips.length > 0 && (
        <div className={styles.spellGroup}>
          <h3 className={styles.groupLabel}>Cantrips</h3>
          <div className={styles.cardsGrid}>
            {cantrips.map((spell) => (
              <SpellCard
                key={spell.name}
                spell={spell}
                isStaged={stagedIds.has(spell.id)}
                isExpanded={expandedSpell === spell.name}
                onToggle={() => {
                  if (stagedIds.has(spell.id)) {
                    onStagedSpellClick?.(spell);
                    return;
                  }
                  toggleSpell(spell.name);
                }}
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
                isStaged={stagedIds.has(spell.id)}
                isExpanded={expandedSpell === spell.name}
                onToggle={() => {
                  if (stagedIds.has(spell.id)) {
                    onStagedSpellClick?.(spell);
                    return;
                  }
                  toggleSpell(spell.name);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );

  if (!title) {
    return content;
  }

  return <Section title={title}>{content}</Section>;
}

type SpellCardProps = {
  spell: Spell;
  isStaged: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

function SpellCard({ spell, isStaged, isExpanded, onToggle }: SpellCardProps) {
  const simplifiedComponents = simplifyComponents(spell.components);
  const formattedDescription = formatDescription(spell.description);
  const spellResult = formatSpellResult(spell);
  const resultColor = spell.damage ? DAMAGE_COLOR : undefined;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`${styles.card} ${isStaged ? styles.cardStaged : ""}`}
    >
      <div className={styles.cardHeader}>
        {spell.icon && (
          <img
            src={resolveIconPath(spell.icon)}
            alt={spell.name}
            className={styles.icon}
          />
        )}
        <div className={styles.cardInfo}>
          <span className={styles.spellName}>{spell.name}</span>
          <span className={styles.spellMeta}>{spell.castingTime}</span>
        </div>
        {spellResult && (
          <span className={styles.resultBadge} style={{ color: resultColor }}>
            {spellResult}
          </span>
        )}
        {isStaged && <span className={styles.stagedTag}>Staged</span>}
      </div>

      {isExpanded && (
        <div className={styles.expanded}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>School</span>
            <span>{spell.school}</span>
          </div>
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
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Components</span>
            <span>{simplifiedComponents}</span>
          </div>
          <p className={styles.descriptionText}>{formattedDescription}</p>
        </div>
      )}
    </button>
  );
}

function simplifyComponents(components: string): string {
  return components.replace(/\s*\([^)]*\)/g, "").trim();
}

function formatDescription(description: string): string {
  return description.replace(/\. (?=[A-Z])/g, ".\n\n");
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
