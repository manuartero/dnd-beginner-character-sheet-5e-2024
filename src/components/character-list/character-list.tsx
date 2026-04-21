import c from "classnames";
import { Banner, InlineConfirm, Section } from "elements";
import { useState } from "react";
import { classes } from "src/models/class/classes";
import styles from "./character-list.module.css";

import type { Character } from "src/models/common/character";

type CharacterListProps = {
  characters: Character[];
  corrupted?: boolean;
  onSelect: (characterId: string) => void;
  onNew: () => void;
  onDelete: (characterId: string) => void;
};

const CORRUPTED_DISMISS_KEY = "corrupted-storage-dismissed";

function CorruptedStorageNotice() {
  const [dismissed, setDismissed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem(CORRUPTED_DISMISS_KEY) === "true",
  );

  if (dismissed) return null;

  function handleDismiss() {
    window.localStorage.setItem(CORRUPTED_DISMISS_KEY, "true");
    setDismissed(true);
  }

  return (
    <Banner icon="⚠" onDismiss={handleDismiss} dismissLabel="Dismiss notice">
      <strong>Some saved characters couldn't be loaded</strong> and were
      discarded.
    </Banner>
  );
}

export function CharacterList({
  characters,
  corrupted = false,
  onSelect,
  onNew,
  onDelete,
}: CharacterListProps) {
  return (
    <Section title="Characters">
      {corrupted && <CorruptedStorageNotice />}
      <div className={styles.grid}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
        <button type="button" className={styles.newCard} onClick={onNew}>
          <span className={styles.newLabel}>+ New</span>
        </button>
      </div>
    </Section>
  );
}

type CharacterCardProps = {
  character: Character;
  onSelect: (characterId: string) => void;
  onDelete: (characterId: string) => void;
};

function CharacterCard({ character, onSelect, onDelete }: CharacterCardProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className={c(styles.cardSurface, styles.card)}>
        <InlineConfirm
          label="Delete?"
          onConfirm={() => {
            onDelete(character.id);
            setConfirming(false);
          }}
          onCancel={() => setConfirming(false)}
        />
      </div>
    );
  }

  return (
    <div className={c(styles.cardSurface, styles.card)}>
      <button
        type="button"
        className={styles.deleteButton}
        aria-label={`Delete ${character.name || "Unnamed"}`}
        onClick={() => setConfirming(true)}
      >
        x
      </button>
      <button
        type="button"
        data-sound="fanfare"
        className={styles.cardBody}
        onClick={() => onSelect(character.id)}
      >
        <img
          src={classes.get({ id: character.characterClass }).icon}
          alt={character.characterClass}
          className={c(styles.classIcon, styles.cardIcon)}
        />
        <span className={styles.cardName}>{character.name || "Unnamed"}</span>
        <span className={styles.cardLevel}>Lvl {character.level}</span>
      </button>
    </div>
  );
}
