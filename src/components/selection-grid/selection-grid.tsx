import cardStyles from "../wizard-card.module.css";

interface SelectionGridProps {
	items: { key: string; label: string }[];
	selectedKey: string | null;
	onSelect: (key: string) => void;
	columns: number;
	getIcon: (key: string) => string;
}

export function SelectionGrid({
	items,
	selectedKey,
	onSelect,
	columns,
	getIcon,
}: SelectionGridProps) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gap: "var(--space-sm)",
			}}
		>
			{items.map(({ key, label }) => (
				<button
					key={key}
					type="button"
					className={`${cardStyles.card} ${selectedKey === key ? cardStyles.cardSelected : ""}`}
					onClick={() => onSelect(key)}
				>
					<img
						src={getIcon(key)}
						alt={label}
						className={cardStyles.cardIcon}
					/>
					<span className={cardStyles.cardLabel}>{label}</span>
				</button>
			))}
		</div>
	);
}
