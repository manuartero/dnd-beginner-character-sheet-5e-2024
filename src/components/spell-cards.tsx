import { useState } from "react";
import type { Spell } from "../data/types";

interface SpellCardsProps {
	spells: Spell[];
}

const DAMAGE_COLORS: Record<string, string> = {
	fire: "var(--color-fire)",
	cold: "var(--color-cold)",
	lightning: "var(--color-lightning)",
	necrotic: "var(--color-necrotic)",
	radiant: "var(--color-radiant)",
	force: "var(--color-force)",
	poison: "var(--color-poison)",
	thunder: "var(--color-lightning)",
	acid: "var(--color-poison)",
	psychic: "var(--color-necrotic)",
};

export function SpellCards({ spells }: SpellCardsProps) {
	const [expandedSpell, setExpandedSpell] = useState<string | null>(null);

	const cantrips = spells.filter((s) => s.level === 0);
	const levelSpells = spells.filter((s) => s.level > 0);

	return (
		<div className="section">
			<h2 className="section-title">Spells</h2>

			{cantrips.length > 0 && (
				<div style={spellGroupStyle}>
					<h3 style={groupLabelStyle}>Cantrips</h3>
					<div style={cardsGridStyle}>
						{cantrips.map((spell) => (
							<SpellCard
								key={spell.name}
								spell={spell}
								isExpanded={expandedSpell === spell.name}
								onToggle={() =>
									setExpandedSpell(
										expandedSpell === spell.name ? null : spell.name,
									)
								}
							/>
						))}
					</div>
				</div>
			)}

			{levelSpells.length > 0 && (
				<div style={spellGroupStyle}>
					<h3 style={groupLabelStyle}>Level 1</h3>
					<div style={cardsGridStyle}>
						{levelSpells.map((spell) => (
							<SpellCard
								key={spell.name}
								spell={spell}
								isExpanded={expandedSpell === spell.name}
								onToggle={() =>
									setExpandedSpell(
										expandedSpell === spell.name ? null : spell.name,
									)
								}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

interface SpellCardProps {
	spell: Spell;
	isExpanded: boolean;
	onToggle: () => void;
}

function SpellCard({ spell, isExpanded, onToggle }: SpellCardProps) {
	const damageColor = spell.damage
		? (DAMAGE_COLORS[spell.damage.type] ?? "var(--color-text)")
		: undefined;

	return (
		<button type="button" onClick={onToggle} style={cardStyle}>
			<div style={cardHeaderStyle}>
				<img src={spell.icon} alt={spell.name} className="icon" />
				<div style={cardInfoStyle}>
					<span style={spellNameStyle}>{spell.name}</span>
					<span style={spellMetaStyle}>{spell.range}</span>
				</div>
			</div>

			{spell.damage && (
				<div style={{ ...damageBadgeStyle, color: damageColor }}>
					{spell.damage.dice} {spell.damage.type}
				</div>
			)}

			{isExpanded && (
				<div style={expandedStyle}>
					<div style={detailRowStyle}>
						<span style={detailLabelStyle}>Casting</span>
						<span>{spell.castingTime}</span>
					</div>
					<div style={detailRowStyle}>
						<span style={detailLabelStyle}>Duration</span>
						<span>{spell.duration}</span>
					</div>
					<div style={detailRowStyle}>
						<span style={detailLabelStyle}>Components</span>
						<span>{spell.components}</span>
					</div>
					<p style={descriptionTextStyle}>{spell.description}</p>
				</div>
			)}
		</button>
	);
}

const spellGroupStyle: React.CSSProperties = {
	marginBottom: "var(--space-md)",
};

const groupLabelStyle: React.CSSProperties = {
	fontSize: "var(--font-size-xs)",
	color: "var(--color-accent)",
	fontWeight: 600,
	textTransform: "uppercase",
	letterSpacing: "0.06em",
	marginBottom: "var(--space-xs)",
};

const cardsGridStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-sm)",
};

const cardStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-xs)",
	padding: "var(--space-sm) var(--space-md)",
	background: "var(--color-bg-elevated)",
	borderRadius: "var(--radius-md)",
	textAlign: "left",
	width: "100%",
};

const cardHeaderStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--space-sm)",
};

const cardInfoStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	flex: 1,
};

const spellNameStyle: React.CSSProperties = {
	fontWeight: 600,
	fontSize: "var(--font-size-md)",
};

const spellMetaStyle: React.CSSProperties = {
	fontSize: "var(--font-size-xs)",
	color: "var(--color-text-muted)",
};

const damageBadgeStyle: React.CSSProperties = {
	fontSize: "var(--font-size-sm)",
	fontWeight: 600,
};

const expandedStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-xs)",
	borderTop: "1px solid var(--color-border)",
	paddingTop: "var(--space-sm)",
	marginTop: "var(--space-xs)",
};

const detailRowStyle: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	fontSize: "var(--font-size-sm)",
};

const detailLabelStyle: React.CSSProperties = {
	color: "var(--color-text-muted)",
};

const descriptionTextStyle: React.CSSProperties = {
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
	lineHeight: 1.4,
	marginTop: "var(--space-xs)",
};
