import { useState } from "react";
import type { CharacterClass } from "../data/types";

const CLASS_OPTIONS: { value: CharacterClass; label: string }[] = [
	{ value: "fighter", label: "Fighter" },
	{ value: "rogue", label: "Rogue" },
	{ value: "wizard", label: "Wizard" },
];

const CLASS_COLORS: Record<CharacterClass, string> = {
	fighter: "var(--color-fighter)",
	rogue: "var(--color-rogue)",
	wizard: "var(--color-wizard)",
};

interface CharacterHeaderProps {
	name: string;
	race: string;
	characterClass: CharacterClass;
	level: number;
	onNameChange: (name: string) => void;
	onRaceChange: (race: string) => void;
	onClassChange: (characterClass: CharacterClass) => void;
}

export function CharacterHeader({
	name,
	race,
	characterClass,
	level,
	onNameChange,
	onRaceChange,
	onClassChange,
}: CharacterHeaderProps) {
	const [isEditingName, setIsEditingName] = useState(!name);

	return (
		<header className="character-header" style={headerStyle}>
			<div style={topRowStyle}>
				{isEditingName ? (
					<input
						type="text"
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
						onBlur={() => name && setIsEditingName(false)}
						placeholder="Character name"
						style={nameInputStyle}
					/>
				) : (
					<button
						type="button"
						onClick={() => setIsEditingName(true)}
						style={nameDisplayStyle}
					>
						{name || "Unnamed"}
					</button>
				)}
				<span style={levelBadgeStyle}>Lvl {level}</span>
			</div>

			<div style={bottomRowStyle}>
				<select
					value={characterClass}
					onChange={(e) => onClassChange(e.target.value as CharacterClass)}
					style={{
						...selectStyle,
						color: CLASS_COLORS[characterClass],
					}}
				>
					{CLASS_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>

				<input
					type="text"
					value={race}
					onChange={(e) => onRaceChange(e.target.value)}
					placeholder="Race"
					style={raceInputStyle}
				/>
			</div>
		</header>
	);
}

const headerStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-sm)",
};

const topRowStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--space-sm)",
};

const nameInputStyle: React.CSSProperties = {
	flex: 1,
	fontSize: "var(--font-size-xl)",
	fontWeight: 700,
	background: "var(--color-bg-surface)",
	padding: "var(--space-xs) var(--space-sm)",
	borderRadius: "var(--radius-sm)",
	border: "1px solid var(--color-border)",
};

const nameDisplayStyle: React.CSSProperties = {
	flex: 1,
	fontSize: "var(--font-size-xl)",
	fontWeight: 700,
	textAlign: "left",
	padding: "var(--space-xs) 0",
};

const levelBadgeStyle: React.CSSProperties = {
	fontSize: "var(--font-size-sm)",
	color: "var(--color-accent)",
	background: "var(--color-bg-elevated)",
	padding: "var(--space-xs) var(--space-sm)",
	borderRadius: "var(--radius-sm)",
	fontWeight: 600,
};

const bottomRowStyle: React.CSSProperties = {
	display: "flex",
	gap: "var(--space-sm)",
};

const selectStyle: React.CSSProperties = {
	fontSize: "var(--font-size-md)",
	fontWeight: 600,
	background: "var(--color-bg-surface)",
	padding: "var(--space-xs) var(--space-sm)",
	borderRadius: "var(--radius-sm)",
	border: "1px solid var(--color-border)",
};

const raceInputStyle: React.CSSProperties = {
	flex: 1,
	fontSize: "var(--font-size-md)",
	background: "var(--color-bg-surface)",
	padding: "var(--space-xs) var(--space-sm)",
	borderRadius: "var(--radius-sm)",
	border: "1px solid var(--color-border)",
};
