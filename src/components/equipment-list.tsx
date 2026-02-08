import { useState } from "react";
import type { Equipment } from "../data/types";

interface EquipmentListProps {
	equipment: Equipment[];
	onEquipmentChange: (equipment: Equipment[]) => void;
}

export function EquipmentList({
	equipment,
	onEquipmentChange,
}: EquipmentListProps) {
	const [isAdding, setIsAdding] = useState(false);

	function handleRemove(index: number) {
		onEquipmentChange(equipment.filter((_, i) => i !== index));
	}

	function handleAdd(item: Equipment) {
		onEquipmentChange([...equipment, item]);
		setIsAdding(false);
	}

	return (
		<div className="section">
			<h2 className="section-title">Equipment</h2>

			<div style={listStyle}>
				{equipment.map((item, index) => (
					<div key={`${item.name}-${index}`} style={itemRowStyle}>
						<img src={item.icon} alt={item.name} className="icon icon--sm" />
						<div style={itemInfoStyle}>
							<span style={itemNameStyle}>{item.name}</span>
							<span style={itemMetaStyle}>
								{item.damage && `${item.damage.dice} ${item.damage.type}`}
								{item.ac && `AC ${item.ac}`}
								{item.properties && item.properties.length > 0 && (
									<> | {item.properties.join(", ")}</>
								)}
							</span>
						</div>
						{item.attackBonus !== undefined && (
							<span style={attackBonusStyle}>+{item.attackBonus}</span>
						)}
						<button
							type="button"
							onClick={() => handleRemove(index)}
							style={removeButtonStyle}
						>
							x
						</button>
					</div>
				))}
			</div>

			{isAdding ? (
				<AddEquipmentForm
					onAdd={handleAdd}
					onCancel={() => setIsAdding(false)}
				/>
			) : (
				<button
					type="button"
					onClick={() => setIsAdding(true)}
					style={addButtonStyle}
				>
					+ Add item
				</button>
			)}
		</div>
	);
}

interface AddEquipmentFormProps {
	onAdd: (item: Equipment) => void;
	onCancel: () => void;
}

function AddEquipmentForm({ onAdd, onCancel }: AddEquipmentFormProps) {
	const [name, setName] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) return;
		onAdd({
			name: name.trim(),
			type: "gear",
			icon: "/dnd-example-assets/BLACK/1x/icon-v9-equipment-pixarts-store_131.png",
		});
	}

	return (
		<form onSubmit={handleSubmit} style={formStyle}>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Item name"
				style={formInputStyle}
			/>
			<button type="submit" style={formSubmitStyle}>
				Add
			</button>
			<button type="button" onClick={onCancel} style={formCancelStyle}>
				Cancel
			</button>
		</form>
	);
}

const listStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-xs)",
	marginBottom: "var(--space-sm)",
};

const itemRowStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--space-sm)",
	padding: "var(--space-sm)",
	background: "var(--color-bg-elevated)",
	borderRadius: "var(--radius-md)",
};

const itemInfoStyle: React.CSSProperties = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
};

const itemNameStyle: React.CSSProperties = {
	fontWeight: 600,
	fontSize: "var(--font-size-sm)",
};

const itemMetaStyle: React.CSSProperties = {
	fontSize: "var(--font-size-xs)",
	color: "var(--color-text-muted)",
};

const attackBonusStyle: React.CSSProperties = {
	fontSize: "var(--font-size-sm)",
	fontWeight: 700,
	color: "var(--color-accent)",
};

const removeButtonStyle: React.CSSProperties = {
	width: "24px",
	height: "24px",
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "var(--radius-sm)",
};

const addButtonStyle: React.CSSProperties = {
	width: "100%",
	padding: "var(--space-sm)",
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
	background: "var(--color-bg-elevated)",
	borderRadius: "var(--radius-md)",
	textAlign: "center",
};

const formStyle: React.CSSProperties = {
	display: "flex",
	gap: "var(--space-xs)",
};

const formInputStyle: React.CSSProperties = {
	flex: 1,
	padding: "var(--space-sm)",
	fontSize: "var(--font-size-sm)",
	background: "var(--color-bg-elevated)",
	borderRadius: "var(--radius-sm)",
	border: "1px solid var(--color-border)",
};

const formSubmitStyle: React.CSSProperties = {
	padding: "var(--space-sm) var(--space-md)",
	fontSize: "var(--font-size-sm)",
	fontWeight: 600,
	background: "var(--color-accent-dim)",
	color: "var(--color-bg)",
	borderRadius: "var(--radius-sm)",
};

const formCancelStyle: React.CSSProperties = {
	padding: "var(--space-sm) var(--space-md)",
	fontSize: "var(--font-size-sm)",
	color: "var(--color-text-muted)",
};
