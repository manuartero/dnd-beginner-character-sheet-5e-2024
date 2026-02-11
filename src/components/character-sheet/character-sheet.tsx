import { saveCharacter } from "src/data/character-storage";
import { WIZARD_CANTRIPS, WIZARD_SPELLS_LEVEL_1 } from "src/data/spells";
import type { Character, Equipment } from "src/data/types";
import { AbilityScores } from "src/components/ability-scores";
import { ActionBar } from "src/components/action-bar";
import { CharacterHeader } from "src/components/character-header";
import { EquipmentList } from "src/components/equipment-list";
import { HpTracker } from "src/components/hp-tracker";
import { SpellCards } from "src/components/spell-cards";

interface CharacterSheetProps {
	character: Character;
	onCharacterUpdate: (character: Character) => void;
}

export function CharacterSheet({
	character,
	onCharacterUpdate,
}: CharacterSheetProps) {
	function updateHpCurrent(value: number) {
		const updated = {
			...character,
			hp: { ...character.hp, current: value },
		};
		saveCharacter(updated);
		onCharacterUpdate(updated);
	}

	function updateEquipment(equipment: Equipment[]) {
		const updated = { ...character, equipment };
		saveCharacter(updated);
		onCharacterUpdate(updated);
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
			/>

			<AbilityScores
				scores={character.abilityScores}
				editable={false}
				onScoreChange={() => {}}
				proficiencyBonus={character.proficiencyBonus}
			/>

			<HpTracker
				current={character.hp.current}
				max={character.hp.max}
				editable={false}
				onCurrentChange={updateHpCurrent}
				onMaxChange={() => {}}
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
