import { useState } from "react";
import type { IconName } from "src/data/icons";
import { getIconPath } from "src/data/icons";
import type { Equipment } from "src/data/types";
import styles from "./equipment-list.module.css";

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

      <div className={styles.list}>
        {equipment.map((item, index) => (
          <div key={`${item.name}-${index}`} className={styles.itemRow}>
            {item.icon && (
              <img
                src={getIconPath(item.icon as IconName)}
                alt={item.name}
                className="icon icon--sm"
              />
            )}
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemMeta}>
                {item.damage && `${item.damage.dice} ${item.damage.type}`}
                {item.ac && `AC ${item.ac}`}
                {item.properties && item.properties.length > 0 && (
                  <> | {item.properties.join(", ")}</>
                )}
              </span>
            </div>
            {item.attackBonus !== undefined && (
              <span className={styles.attackBonus}>+{item.attackBonus}</span>
            )}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={styles.removeButton}
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
          className={styles.addButton}
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
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className={styles.formInput}
      />
      <button type="submit" className={styles.formSubmit}>
        Add
      </button>
      <button type="button" onClick={onCancel} className={styles.formCancel}>
        Cancel
      </button>
    </form>
  );
}
