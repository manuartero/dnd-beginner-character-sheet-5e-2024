import { useState } from "react";
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
import { EquipmentList } from "./equipment-list";
import { HpTracker } from "./hp-tracker";
import { SpellCards } from "./spell-cards";

const DEFAULT_CHARACTER: Character = {
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

export function CharacterSheet() {
	const [character, setCharacter] = useState<Character>(DEFAULT_CHARACTER);

	function updateCharacter(partial: Partial<Character>) {
		setCharacter((prev) => ({ ...prev, ...partial }));
	}

	function updateAbilityScore(ability: AbilityName, value: number) {
		setCharacter((prev) => ({
			...prev,
			abilityScores: { ...prev.abilityScores, [ability]: value },
		}));
	}

	function updateHp(field: "current" | "max", value: number) {
		setCharacter((prev) => ({
			...prev,
			hp: { ...prev.hp, [field]: value },
		}));
	}

	function updateEquipment(equipment: Equipment[]) {
		updateCharacter({ equipment });
	}

	const spells =
		character.characterClass === "wizard"
			? [...WIZARD_CANTRIPS, ...WIZARD_SPELLS_LEVEL_1]
			: [];

	return (
		<>
			<CharacterHeader
				name={character.name}
				race={character.race}
				characterClass={character.characterClass}
				level={character.level}
				onNameChange={(name) => updateCharacter({ name })}
				onRaceChange={(race) => updateCharacter({ race })}
				onClassChange={(characterClass) => updateCharacter({ characterClass })}
			/>

			<AbilityScores
				scores={character.abilityScores as AbilityScoresType}
				onScoreChange={updateAbilityScore}
			/>

			<HpTracker
				current={character.hp.current}
				max={character.hp.max}
				onCurrentChange={(v) => updateHp("current", v)}
				onMaxChange={(v) => updateHp("max", v)}
			/>

			<ActionBar characterClass={character.characterClass} />

			{spells.length > 0 && <SpellCards spells={spells} />}

			<EquipmentList
				equipment={character.equipment}
				onEquipmentChange={updateEquipment}
			/>
		</>
	);
}
