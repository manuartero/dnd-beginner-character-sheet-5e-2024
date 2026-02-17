import { useEffect, useState } from "react";
import { type SoundVariant, play8BitSound } from "src/audio/play-sound";
import { CharacterCreation } from "src/components/character-creation";
import { CharacterList } from "src/components/character-list";
import { CharacterSheet } from "src/components/character-sheet";
import { ScreenFlash } from "src/components/screen-flash/screen-flash";
import { TopMenu } from "src/components/top-menu";
import type { Character } from "src/models/character";
import { deleteCharacter, loadCharacters } from "src/models/character-storage";
import styles from "./app.module.css";

type AppView =
  | { kind: "character-list" }
  | { kind: "character-view"; characterId: string }
  | { kind: "character-creation" };

export function App() {
  const [view, setView] = useState<AppView>({ kind: "character-list" });
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setCharacters(loadCharacters());
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const button = (e.target as HTMLElement).closest("button");
      if (!button) return;
      const variant = (button.dataset.sound ?? "click") as SoundVariant;
      play8BitSound(variant);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
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

  const activeCharacter =
    view.kind === "character-view"
      ? characters.find((c) => c.id === view.characterId)
      : undefined;

  function getMenuTitle(): string {
    if (view.kind === "character-view") {
      return activeCharacter?.name || "Character";
    }
    if (view.kind === "character-creation") {
      return "New Character";
    }
    return "D&D 5e Sheet";
  }

  return (
    <div className={styles.layout}>
      <ScreenFlash
        trigger={view.kind === "character-view" ? view.characterId : view.kind}
      />
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
