import { useState } from "react";
import { InlineConfirm } from "src/components/inline-confirm/inline-confirm";
import { Section } from "src/components/section";
import type { Equipment } from "src/models/equipment";
import { resolveIconPath } from "src/models/icons";
import styles from "./equipment-list.module.css";

type ReadonlyProps = {
  mode: "readonly";
  title?: string;
  equipment: Equipment[];
};

type EditableProps = {
  mode: "editable";
  title?: string;
  equipment: Equipment[];
  onEquipmentChange: (equipment: Equipment[]) => void;
};

type EquipmentListProps = ReadonlyProps | EditableProps;

export function EquipmentList(props: EquipmentListProps) {
  const { equipment, mode, title = "Equipment" } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [removingItemIndex, setRemovingItemIndex] = useState<number | null>(
    null,
  );

  function handleRemove(index: number) {
    if (props.mode !== "editable") return;
    props.onEquipmentChange(equipment.filter((_, i) => i !== index));
    setRemovingItemIndex(null);
  }

  function handleAdd(item: Equipment) {
    if (props.mode !== "editable") return;
    props.onEquipmentChange([...equipment, item]);
    setIsAdding(false);
  }

  return (
    <Section title={title}>
      <div className={styles.list}>
        {equipment.map((item, index) => (
          <div key={`${item.name}-${index}`} className={styles.itemRow}>
            {removingItemIndex === index && (
              <InlineConfirm
                label={`Remove ${item.name} from Inventory?`}
                onConfirm={() => handleRemove(index)}
                onCancel={() => setRemovingItemIndex(null)}
              />
            )}
            {removingItemIndex !== index && (
              <>
                {item.icon && (
                  <img
                    src={resolveIconPath(item.icon)}
                    alt={item.name}
                    className={styles.icon}
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
                  <span className={styles.attackBonus}>
                    +{item.attackBonus}
                  </span>
                )}
                {item.quantity !== undefined && item.quantity > 1 && (
                  <span className={styles.quantity}>x{item.quantity}</span>
                )}
                {mode === "editable" && (
                  <button
                    type="button"
                    onClick={() => setRemovingItemIndex(index)}
                    className={styles.removeButton}
                  >
                    x
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {mode === "editable" &&
        (isAdding ? (
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
        ))}
    </Section>
  );
}

type AddEquipmentFormProps = {
  onAdd: (item: Equipment) => void;
  onCancel: () => void;
};

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
