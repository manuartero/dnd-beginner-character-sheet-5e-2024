import c from "classnames";
import { InlineConfirm, Section } from "elements";
import { useState } from "react";
import { getClassIcon } from "src/models/classes";
import styles from "./character-list.module.css";

import type { Character } from "src/models/character";

type CharacterListProps = {
  characters: Character[];
  onSelect: (characterId: string) => void;
  onNew: () => void;
  onDelete: (characterId: string) => void;
};

export function CharacterList({
  characters,
  onSelect,
  onNew,
  onDelete,
}: CharacterListProps) {
  return (
    <Section title="Characters">
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
          src={getClassIcon(character.characterClass)}
          alt={character.characterClass}
          className={c(styles.classIcon, styles.cardIcon)}
        />
        <span className={styles.cardName}>{character.name || "Unnamed"}</span>
        <span className={styles.cardLevel}>Lvl {character.level}</span>
      </button>
    </div>
  );
}
