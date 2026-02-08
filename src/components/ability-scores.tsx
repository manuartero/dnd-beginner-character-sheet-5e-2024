import {
	ABILITY_LIST,
	computeModifier,
	formatModifier,
} from "../data/abilities";
import type {
	AbilityName,
	AbilityScores as AbilityScoresType,
} from "../data/types";

interface AbilityScoresProps {
	scores: AbilityScoresType;
	editable: boolean;
	onScoreChange: (ability: AbilityName, value: number) => void;
}

export function AbilityScores({
	scores,
	editable,
	onScoreChange,
}: AbilityScoresProps) {
	return (
		<div className="section">
			<h2 className="section-title">Abilities</h2>
			<div style={gridStyle}>
				{ABILITY_LIST.map(({ key, short }) => {
					const score = scores[key];
					const mod = computeModifier(score);
					return (
						<div key={key} style={abilityCardStyle}>
							<span style={labelStyle}>{short}</span>
							<span style={modifierStyle}>{formatModifier(mod)}</span>
							{editable ? (
								<input
									type="number"
									min={1}
									max={30}
									value={score}
									onChange={(e) => {
										const parsed = Number.parseInt(e.target.value, 10);
										if (!Number.isNaN(parsed)) {
											onScoreChange(key, parsed);
										}
									}}
									style={scoreInputStyle}
								/>
							) : (
								<span style={scoreStaticStyle}>{score}</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

const gridStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gap: "var(--space-sm)",
};

const abilityCardStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "2px",
	background: "var(--color-bg-elevated)",
	border: "2px solid var(--color-border)",
	padding: "var(--space-sm)",
};

const labelStyle: React.CSSProperties = {
	fontSize: "var(--font-size-xs)",
	color: "var(--color-text-muted)",
	fontWeight: 600,
	letterSpacing: "0.05em",
};

const modifierStyle: React.CSSProperties = {
	fontSize: "var(--font-size-lg)",
	fontWeight: 700,
	color: "var(--color-accent)",
};

const scoreInputStyle: React.CSSProperties = {
	width: "40px",
	textAlign: "center",
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
	background: "transparent",
	borderBottom: "1px solid var(--color-border)",
};

const scoreStaticStyle: React.CSSProperties = {
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
};
