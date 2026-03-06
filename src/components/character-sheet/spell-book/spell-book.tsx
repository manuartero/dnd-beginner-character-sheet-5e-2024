import c from "classnames";
import { Section } from "elements";
import { Fragment, useState } from "react";
import { SpellCards } from "src/components/character-sheet/spell-cards/spell-cards";
import descriptionPopoverStyles from "src/elements/style/description-popover.module.css";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { useExpandable } from "src/hooks/use-expandable";
import { resolveIconPath } from "src/models/icons";
import styles from "./spell-book.module.css";

import type { Spell } from "src/models/spells";

type SpellBookProps = {
  availableCantrips: Spell[];
  availableLevel1: Spell[];
  selectedSpells: Spell[];
  cantripLimit: number;
  level1Limit: number;
  onSpellsChange: (spells: Spell[]) => void;
};

export function SpellBook({
  availableCantrips,
  availableLevel1,
  selectedSpells,
  cantripLimit,
  level1Limit,
  onSpellsChange,
}: SpellBookProps) {
  const [preparationMode, setPreparationMode] = useState<
    "cantrip" | "level1" | null
  >(null);
  const [stagedSpells, setStagedSpells] = useState<Spell[]>([]);

  const committedCantrips = selectedSpells.filter((s) => s.level === 0);
  const committedLevel1 = selectedSpells.filter((s) => s.level > 0);
  const stagedCantrips = stagedSpells.filter((s) => s.level === 0);
  const stagedLevel1 = stagedSpells.filter((s) => s.level > 0);
  const spellBookSpells = [...selectedSpells, ...stagedSpells];
  const stagedSpellIds = stagedSpells.map((spell) => spell.id);

  function toggleStagedSpell(
    spell: Spell,
    committedGroup: Spell[],
    stagedGroup: Spell[],
    limit: number,
  ): void {
    const isCommitted = committedGroup.some((s) => s.id === spell.id);
    const isStaged = stagedGroup.some((s) => s.id === spell.id);
    if (isCommitted) {
      return;
    }
    if (isStaged) {
      setStagedSpells((current) => current.filter((s) => s.id !== spell.id));
      return;
    }

    if (committedGroup.length + stagedGroup.length < limit) {
      setStagedSpells((current) => [...current, spell]);
    }
  }

  function unstageSpell(spell: Spell): void {
    setStagedSpells((current) => current.filter((s) => s.id !== spell.id));
  }

  function commitStagedSpells(): void {
    if (stagedSpells.length === 0) {
      return;
    }
    onSpellsChange([...selectedSpells, ...stagedSpells]);
    setStagedSpells([]);
  }

  return (
    <>
      <Section title="Spell Book">
        <SpellCards
          spells={spellBookSpells}
          title=""
          stagedSpellIds={stagedSpellIds}
          onStagedSpellClick={unstageSpell}
          cantripLimit={cantripLimit}
          level1Limit={level1Limit}
        />
        {stagedSpells.length > 0 && (
          <p className={styles.stagedHint}>
            Staged spells are grey. Click a staged spell to unstage it.
          </p>
        )}
        <button
          type="button"
          className={styles.commitButton}
          disabled={stagedSpells.length === 0}
          onClick={commitStagedSpells}
        >
          Commit to Spell Book ({stagedSpells.length})
        </button>
      </Section>

      <Section title="Prepare Spells">
        <div className={styles.modeButtons}>
          <button
            type="button"
            className={c(
              styles.modeButton,
              preparationMode === "cantrip" && styles.modeButtonActive,
            )}
            aria-pressed={preparationMode === "cantrip"}
            onClick={() =>
              setPreparationMode((prev) =>
                prev === "cantrip" ? null : "cantrip",
              )
            }
          >
            Prepare Cantrips ({committedCantrips.length + stagedCantrips.length}
            /{cantripLimit})
          </button>
          <button
            type="button"
            className={c(
              styles.modeButton,
              preparationMode === "level1" && styles.modeButtonActive,
            )}
            aria-pressed={preparationMode === "level1"}
            onClick={() =>
              setPreparationMode((prev) =>
                prev === "level1" ? null : "level1",
              )
            }
          >
            Prepare Level 1 ({committedLevel1.length + stagedLevel1.length}/
            {level1Limit})
          </button>
        </div>

        {preparationMode !== null && (
          <div key={preparationMode} className={styles.gridRollOut}>
            {preparationMode === "cantrip" ? (
              <SpellSelectionGrid
                spells={availableCantrips}
                committedGroup={committedCantrips}
                stagedGroup={stagedCantrips}
                limit={cantripLimit}
                onToggle={(spell) =>
                  toggleStagedSpell(
                    spell,
                    committedCantrips,
                    stagedCantrips,
                    cantripLimit,
                  )
                }
              />
            ) : (
              <SpellSelectionGrid
                spells={availableLevel1}
                committedGroup={committedLevel1}
                stagedGroup={stagedLevel1}
                limit={level1Limit}
                onToggle={(spell) =>
                  toggleStagedSpell(
                    spell,
                    committedLevel1,
                    stagedLevel1,
                    level1Limit,
                  )
                }
              />
            )}
          </div>
        )}
      </Section>
    </>
  );
}

type SpellSelectionGridProps = {
  spells: Spell[];
  committedGroup: Spell[];
  stagedGroup: Spell[];
  limit: number;
  onToggle: (spell: Spell) => void;
};

function SpellSelectionGrid({
  spells,
  committedGroup,
  stagedGroup,
  limit,
  onToggle,
}: SpellSelectionGridProps) {
  const CARDS_PER_ROW = 3;
  const { expandedKey: expandedId, toggle: toggleExpanded } =
    useExpandable<string>();
  const { buttonRefs, arrowOffset } = useArrowOffset(expandedId);

  const expandedIndex = expandedId
    ? spells.findIndex((spell) => spell.id === expandedId)
    : -1;

  const expandedSpell = expandedIndex >= 0 ? spells[expandedIndex] : null;
  const expandedRowEndIndex =
    expandedIndex >= 0
      ? Math.min(
          Math.floor(expandedIndex / CARDS_PER_ROW) * CARDS_PER_ROW +
            CARDS_PER_ROW -
            1,
          spells.length - 1,
        )
      : -1;

  return (
    <div className={styles.gridWrapper}>
      <span className={styles.counter}>
        {committedGroup.length + stagedGroup.length} / {limit}
      </span>
      <div className={styles.spellGrid}>
        {spells.map((spell, index) => {
          const isCommitted = committedGroup.some((s) => s.id === spell.id);
          const isStaged = stagedGroup.some((s) => s.id === spell.id);
          const isDisabled =
            !isCommitted &&
            !isStaged &&
            committedGroup.length + stagedGroup.length >= limit;
          const isExpanded = expandedId === spell.id;
          return (
            <Fragment key={spell.id}>
              <button
                ref={(el) => {
                  if (el) buttonRefs.current.set(spell.id, el);
                  else buttonRefs.current.delete(spell.id);
                }}
                type="button"
                aria-label={spell.name}
                aria-expanded={isExpanded}
                disabled={isDisabled}
                className={c(
                  styles.spellCard,
                  (isCommitted || isStaged) && styles.spellCardSelected,
                  isCommitted && styles.spellCardCommitted,
                  isStaged && styles.spellCardStaged,
                  isDisabled && styles.spellCardDisabled,
                  isExpanded && styles.spellCardExpanded,
                )}
                onClick={() => {
                  onToggle(spell);
                  toggleExpanded(spell.id);
                }}
              >
                <span className={styles.spellName}>{spell.name}</span>
                {spell.icon && (
                  <img
                    src={resolveIconPath(spell.icon)}
                    alt=""
                    className={styles.spellIcon}
                  />
                )}
                <span className={styles.spellSchool}>{spell.school}</span>
              </button>

              {expandedSpell && index === expandedRowEndIndex && (
                <div className={descriptionPopoverStyles.descriptionRow}>
                  <span
                    className={descriptionPopoverStyles.descriptionArrow}
                    style={{ left: `${arrowOffset}px` }}
                  />
                  <div className={styles.descriptionPanel}>
                    <div className={styles.panelMeta}>
                      <div className={styles.metaRows}>
                        <div className={styles.metaRow}>
                          <span className={styles.metaLabel}>Range</span>
                          <span>{expandedSpell.range}</span>
                        </div>
                        <div className={styles.metaRow}>
                          <span className={styles.metaLabel}>Cast</span>
                          <span>{expandedSpell.castingTime}</span>
                        </div>
                        {expandedSpell.save && (
                          <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>Save</span>
                            <span>{expandedSpell.save}</span>
                          </div>
                        )}
                        {expandedSpell.damage && (
                          <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>Damage</span>
                            <span>
                              {expandedSpell.damage.dice}{" "}
                              {expandedSpell.damage.type}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={styles.keywords}>
                        {expandedSpell.concentration && (
                          <span className={styles.keyword}>Concentration</span>
                        )}
                        {expandedSpell.ritual && (
                          <span className={styles.keyword}>Ritual</span>
                        )}
                      </div>
                    </div>
                    <p className={styles.description}>
                      {expandedSpell.description}
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
