import { useEffect, useState } from "react";
import { loadCharacters } from "../data/character-storage";
import type { AppView, Character } from "../data/types";
import styles from "./app.module.css";
import { CharacterList } from "./character-list";
import { CharacterSheet } from "./character-sheet";
import { CreationWizard } from "./creation-wizard";
import { TopMenu } from "./top-menu";

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
					/>
				)}
				{view.kind === "character-creation" && (
					<CreationWizard onSave={handleSave} />
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
