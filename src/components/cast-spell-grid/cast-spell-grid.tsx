import {
  AccordionGroup,
  AccordionItem,
  AccordionList,
  accordionStyles as styles,
} from "elements";
import { resolveIconPath } from "src/models/icons";

import type { Spell } from "src/models/spells";

type CastSpellGridProps = {
  spells: Spell[];
};

const DAMAGE_COLOR = "var(--color-highlight)";

export function CastSpellGrid({ spells }: CastSpellGridProps) {
  const cantrips = spells.filter((s) => s.level === 0);
  const levelSpells = spells.filter((s) => s.level > 0);

  return (
    <AccordionList>
      {cantrips.length > 0 && (
        <AccordionGroup label="Cantrips (unlimited)">
          {cantrips.map((spell) => (
            <AccordionItem
              key={spell.id}
              itemKey={spell.id}
              header={<SpellHeader spell={spell} />}
            >
              <SpellDetails spell={spell} />
            </AccordionItem>
          ))}
        </AccordionGroup>
      )}
      {levelSpells.length > 0 && (
        <AccordionGroup label="Level 1">
          {levelSpells.map((spell) => (
            <AccordionItem
              key={spell.id}
              itemKey={spell.id}
              header={<SpellHeader spell={spell} />}
            >
              <SpellDetails spell={spell} />
            </AccordionItem>
          ))}
        </AccordionGroup>
      )}
    </AccordionList>
  );
}

function SpellHeader({ spell }: { spell: Spell }) {
  const result = formatSpellResult(spell);
  const resultColor = spell.damage ? DAMAGE_COLOR : undefined;

  return (
    <>
      {spell.icon && (
        <img src={resolveIconPath(spell.icon)} alt="" className={styles.icon} />
      )}
      <span className={styles.title}>{spell.name}</span>
      {result && (
        <span className={styles.badge} style={{ color: resultColor }}>
          {result}
        </span>
      )}
    </>
  );
}

function SpellDetails({ spell }: { spell: Spell }) {
  return (
    <>
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
    </>
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
