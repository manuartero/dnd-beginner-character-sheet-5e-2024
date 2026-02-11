import { useEffect, useState } from "react";
import { CharacterCreation } from "src/components/character-creation";
import { CharacterList } from "src/components/character-list";
import { CharacterSheet } from "src/components/character-sheet";
import { TopMenu } from "src/components/top-menu";
import { deleteCharacter, loadCharacters } from "src/data/character-storage";
import type { AppView, Character } from "src/data/types";
import styles from "./app.module.css";

export function App() {
  const [view, setView] = useState<AppView>({ kind: "character-list" });
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setCharacters(loadCharacters());
  }, []);

  function goToList() {
    setCharacters(loadCharacters());
    setView({ kind: "character-list" });
  }

  function handleSelect(characterId: string) {
    setView({ kind: "character-view", characterId });
  }

  function handleNew() {
    setView({ kind: "character-creation" });
  }

  function handleDelete(characterId: string) {
    deleteCharacter(characterId);
    setCharacters(loadCharacters());
  }

  function handleSave(character: Character) {
    setCharacters(loadCharacters());
    setView({ kind: "character-view", characterId: character.id });
  }

  function handleCharacterUpdate(updated: Character) {
    setCharacters((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c)),
    );
  }

  function getMenuTitle(): string {
    if (view.kind === "character-view") {
      const char = characters.find((c) => c.id === view.characterId);
      return char?.name || "Character";
    }
    if (view.kind === "character-creation") {
      return "New Character";
    }
    return "D&D 5e Sheet";
  }

  const activeCharacter =
    view.kind === "character-view"
      ? characters.find((c) => c.id === view.characterId)
      : undefined;

  return (
    <div className={styles.layout}>
      <TopMenu
        title={getMenuTitle()}
        showBack={view.kind !== "character-list"}
        onBack={goToList}
      />
      <div className={styles.content}>
        {view.kind === "character-list" && (
          <CharacterList
            characters={characters}
            onSelect={handleSelect}
            onNew={handleNew}
            onDelete={handleDelete}
          />
        )}
        {view.kind === "character-creation" && (
          <CharacterCreation onSave={handleSave} />
        )}
        {view.kind === "character-view" && activeCharacter && (
          <CharacterSheet
            character={activeCharacter}
            onCharacterUpdate={handleCharacterUpdate}
          />
        )}
      </div>
    </div>
  );
}
