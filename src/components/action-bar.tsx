import { useState } from "react";
import { CLASS_ACTIONS, UNIVERSAL_ACTIONS } from "../data/actions";
import type { Action, ActionTiming, CharacterClass } from "../data/types";

interface ActionBarProps {
	characterClass: CharacterClass;
}

const TIMING_LABELS: Record<ActionTiming, string> = {
	action: "Actions",
	"bonus-action": "Bonus Actions",
	reaction: "Reactions",
};

const TIMING_ORDER: ActionTiming[] = ["action", "bonus-action", "reaction"];

export function ActionBar({ characterClass }: ActionBarProps) {
	const [expandedAction, setExpandedAction] = useState<string | null>(null);

	const availableActions = [
		...UNIVERSAL_ACTIONS,
		...CLASS_ACTIONS.filter(
			(a) => !a.classRestriction || a.classRestriction === characterClass,
		),
	];

	const grouped = TIMING_ORDER.map((timing) => ({
		timing,
		label: TIMING_LABELS[timing],
		actions: availableActions.filter((a) => a.timing === timing),
	})).filter((group) => group.actions.length > 0);

	return (
		<div className="section">
			<h2 className="section-title">Combat</h2>
			<div style={groupsContainerStyle}>
				{grouped.map((group) => (
					<div key={group.timing}>
						<h3 style={groupLabelStyle}>{group.label}</h3>
						<div style={actionsGridStyle}>
							{group.actions.map((action) => (
								<ActionButton
									key={action.name}
									action={action}
									isExpanded={expandedAction === action.name}
									onToggle={() =>
										setExpandedAction(
											expandedAction === action.name ? null : action.name,
										)
									}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

interface ActionButtonProps {
	action: Action;
	isExpanded: boolean;
	onToggle: () => void;
}

function ActionButton({ action, isExpanded, onToggle }: ActionButtonProps) {
	return (
		<div style={actionWrapperStyle}>
			<button type="button" onClick={onToggle} style={actionButtonStyle}>
				<img src={action.icon} alt={action.name} className="icon" />
				<span style={actionLabelStyle}>{action.name}</span>
			</button>
			{isExpanded && <div style={descriptionStyle}>{action.description}</div>}
		</div>
	);
}

const groupsContainerStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-md)",
};

const groupLabelStyle: React.CSSProperties = {
	fontSize: "var(--font-size-xs)",
	color: "var(--color-accent)",
	fontWeight: 600,
	textTransform: "uppercase",
	letterSpacing: "0.06em",
	marginBottom: "var(--space-xs)",
};

const actionsGridStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
	gap: "var(--space-sm)",
};

const actionWrapperStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
};

const actionButtonStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "var(--space-xs)",
	padding: "var(--space-sm)",
	background: "var(--color-bg-elevated)",
	border: "2px solid var(--color-border)",
	minHeight: "72px",
	justifyContent: "center",
};

const actionLabelStyle: React.CSSProperties = {
	fontSize: "var(--font-size-xs)",
	textAlign: "center",
	lineHeight: 1.2,
};

const descriptionStyle: React.CSSProperties = {
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
	padding: "var(--space-sm)",
	background: "var(--color-bg)",
	border: "2px solid var(--color-border)",
	borderTop: "none",
	lineHeight: 1.4,
};
