interface HpTrackerProps {
	current: number;
	max: number;
	onCurrentChange: (value: number) => void;
	onMaxChange: (value: number) => void;
}

export function HpTracker({
	current,
	max,
	onCurrentChange,
	onMaxChange,
}: HpTrackerProps) {
	const ratio = max > 0 ? current / max : 0;
	const barColor =
		ratio > 0.5
			? "var(--color-hp)"
			: ratio > 0.25
				? "var(--color-accent)"
				: "var(--color-fighter)";

	return (
		<div className="section">
			<h2 className="section-title">Hit Points</h2>

			<div style={barContainerStyle}>
				<div
					style={{
						...barFillStyle,
						width: `${Math.max(0, Math.min(100, ratio * 100))}%`,
						backgroundColor: barColor,
					}}
				/>
			</div>

			<div style={controlsStyle}>
				<button
					type="button"
					onClick={() => onCurrentChange(Math.max(0, current - 1))}
					style={buttonStyle}
				>
					-
				</button>

				<div style={hpDisplayStyle}>
					<input
						type="number"
						min={0}
						value={current}
						onChange={(e) => {
							const parsed = Number.parseInt(e.target.value, 10);
							if (!Number.isNaN(parsed)) onCurrentChange(parsed);
						}}
						style={hpInputStyle}
					/>
					<span style={separatorStyle}>/</span>
					<input
						type="number"
						min={1}
						value={max}
						onChange={(e) => {
							const parsed = Number.parseInt(e.target.value, 10);
							if (!Number.isNaN(parsed)) onMaxChange(parsed);
						}}
						style={hpInputStyle}
					/>
				</div>

				<button
					type="button"
					onClick={() => onCurrentChange(Math.min(max, current + 1))}
					style={buttonStyle}
				>
					+
				</button>
			</div>
		</div>
	);
}

const barContainerStyle: React.CSSProperties = {
	height: "12px",
	background: "var(--color-hp-missing)",
	border: "2px solid var(--color-border)",
	overflow: "hidden",
	marginBottom: "var(--space-sm)",
};

const barFillStyle: React.CSSProperties = {
	height: "100%",
};

const controlsStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "var(--space-md)",
};

const buttonStyle: React.CSSProperties = {
	width: "40px",
	height: "40px",
	fontSize: "var(--font-size-lg)",
	fontWeight: 700,
	background: "var(--color-bg-elevated)",
	border: "2px solid var(--color-border)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const hpDisplayStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--space-xs)",
};

const hpInputStyle: React.CSSProperties = {
	width: "48px",
	textAlign: "center",
	fontSize: "var(--font-size-xl)",
	fontWeight: 700,
	background: "transparent",
};

const separatorStyle: React.CSSProperties = {
	fontSize: "var(--font-size-lg)",
	color: "var(--color-text-muted)",
};
