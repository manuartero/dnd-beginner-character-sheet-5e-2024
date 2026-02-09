import { useState } from "react";
import { saveCharacter } from "../data/character-storage";
import { WIZARD_CANTRIPS, WIZARD_SPELLS_LEVEL_1 } from "../data/spells";
import type {
	AbilityName,
	AbilityScores as AbilityScoresType,
	Character,
	Equipment,
} from "../data/types";
import { AbilityScores } from "./ability-scores";
import { ActionBar } from "./action-bar";
import { CharacterHeader } from "./character-header";
import styles from "./character-sheet.module.css";
import { EquipmentList } from "./equipment-list";
import { HpTracker } from "./hp-tracker";
import { SpellCards } from "./spell-cards";

const DEFAULT_CHARACTER: Omit<Character, "id"> = {
	name: "",
	race: "",
	characterClass: "fighter",
	level: 1,
	abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
	hp: { current: 10, max: 10 },
	ac: 10,
	proficiencyBonus: 2,
	spells: [],
	equipment: [],
};

type CharacterSheetProps =
	| {
			mode: "creation";
			onSave: (character: Character) => void;
	  }
	| {
			mode: "view";
			character: Character;
			onCharacterUpdate: (character: Character) => void;
	  };

export function CharacterSheet(props: CharacterSheetProps) {
	const isCreation = props.mode === "creation";

	const [draft, setDraft] = useState<Omit<Character, "id">>(
		isCreation ? DEFAULT_CHARACTER : props.character,
	);

	function updateDraft(partial: Partial<Character>) {
		if (isCreation) {
			setDraft((prev) => ({ ...prev, ...partial }));
		}
	}

	function updateAbilityScore(ability: AbilityName, value: number) {
		if (isCreation) {
			setDraft((prev) => ({
				...prev,
				abilityScores: { ...prev.abilityScores, [ability]: value },
			}));
		}
	}

	function updateHp(field: "current" | "max", value: number) {
		if (isCreation) {
			setDraft((prev) => ({
				...prev,
				hp: { ...prev.hp, [field]: value },
			}));
			return;
		}
		if (field === "current") {
			const updated = {
				...props.character,
				hp: { ...props.character.hp, current: value },
			};
			saveCharacter(updated);
			props.onCharacterUpdate(updated);
		}
	}

	function updateEquipment(equipment: Equipment[]) {
		if (isCreation) {
			setDraft((prev) => ({ ...prev, equipment }));
			return;
		}
		const updated = { ...props.character, equipment };
		saveCharacter(updated);
		props.onCharacterUpdate(updated);
	}

	function handleSave() {
		if (!isCreation) return;
		const saved: Character = {
			...draft,
			id: crypto.randomUUID(),
		};
		saveCharacter(saved);
		props.onSave(saved);
	}

	const activeChar = isCreation ? { ...draft, id: "" } : props.character;
	const spells =
		activeChar.characterClass === "wizard"
			? [...WIZARD_CANTRIPS, ...WIZARD_SPELLS_LEVEL_1]
			: [];

	return (
		<>
			<CharacterHeader
				name={activeChar.name}
				race={activeChar.race}
				characterClass={activeChar.characterClass}
				level={activeChar.level}
				editable={isCreation}
				onNameChange={(name) => updateDraft({ name })}
				onRaceChange={(race) => updateDraft({ race })}
				onClassChange={(characterClass) => updateDraft({ characterClass })}
			/>

			<AbilityScores
				scores={activeChar.abilityScores as AbilityScoresType}
				editable={isCreation}
				onScoreChange={updateAbilityScore}
			/>

			{isCreation && (
				<button
					type="button"
					onClick={handleSave}
					className={styles.saveButton}
				>
					Save Character
				</button>
			)}

			<HpTracker
				current={activeChar.hp.current}
				max={activeChar.hp.max}
				editable={isCreation}
				onCurrentChange={(v) => updateHp("current", v)}
				onMaxChange={(v) => updateHp("max", v)}
			/>

			<ActionBar characterClass={activeChar.characterClass} />

			{spells.length > 0 && <SpellCards spells={spells} />}

			<EquipmentList
				equipment={activeChar.equipment}
				onEquipmentChange={updateEquipment}
			/>
		</>
	);
}
