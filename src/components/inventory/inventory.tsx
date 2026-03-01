import { useState } from "react";
import { InlineConfirm } from "src/components/inline-confirm/inline-confirm";
import { RowList } from "src/components/row-list";
import { Section } from "src/components/section";
import { GOLD_ICON } from "src/models/equipment";
import { resolveIconPath } from "src/models/icons";
import styles from "./inventory.module.css";

import type { Equipment } from "src/models/equipment";

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

type InventoryProps = ReadonlyProps | EditableProps;

type IndexedEquipment = {
  index: number;
  item: Equipment;
};

type GroupedInventory = {
  armsAndArmor: IndexedEquipment[];
  adventureGear: IndexedEquipment[];
  money: Equipment | null;
};

function groupEquipment(equipment: Equipment[]): GroupedInventory {
  const armsAndArmor: IndexedEquipment[] = [];
  const adventureGear: IndexedEquipment[] = [];
  let money: Equipment | null = null;

  for (const [index, item] of equipment.entries()) {
    if (item.type === "money") {
      money = item;
    } else if (
      item.type === "weapon" ||
      item.type === "armor" ||
      item.type === "shield"
    ) {
      armsAndArmor.push({ index, item });
    } else {
      adventureGear.push({ index, item });
    }
  }

  return { armsAndArmor, adventureGear, money };
}

export function Inventory(props: InventoryProps) {
  const { equipment, mode, title = "Inventory" } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [removingItemIndex, setRemovingItemIndex] = useState<number | null>(
    null,
  );

  const { armsAndArmor, adventureGear, money } = groupEquipment(equipment);

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

  function handleGoldChange(amount: number) {
    if (props.mode !== "editable") return;
    const updated = equipment.map((item) =>
      item.type === "money" ? { ...item, quantity: amount } : item,
    );
    props.onEquipmentChange(updated);
  }

  return (
    <Section title={title}>
      <RowList
        title="Arms & Armor"
        ariaLabel="Arms and armor"
        items={armsAndArmor}
        renderItem={(item, index) =>
          removingItemIndex === index ? (
            <InlineConfirm
              label={`Remove ${item.name} from Inventory?`}
              onConfirm={() => handleRemove(index)}
              onCancel={() => setRemovingItemIndex(null)}
            />
          ) : (
            <ItemContent
              item={item}
              mode={mode}
              onRemoveRequest={() => setRemovingItemIndex(index)}
            />
          )
        }
      />

      <RowList
        title="Adventure Gear"
        ariaLabel="Adventure gear"
        items={adventureGear}
        renderItem={(item, index) =>
          removingItemIndex === index ? (
            <InlineConfirm
              label={`Remove ${item.name} from Inventory?`}
              onConfirm={() => handleRemove(index)}
              onCancel={() => setRemovingItemIndex(null)}
            />
          ) : (
            <ItemContent
              item={item}
              mode={mode}
              onRemoveRequest={() => setRemovingItemIndex(index)}
            />
          )
        }
      />

      {money && (
        <div className={styles.subsection}>
          <h3 className={styles.subsectionLabel}>Money</h3>
          <MoneyTag
            gold={money.quantity ?? 0}
            mode={mode}
            onGoldChange={handleGoldChange}
          />
        </div>
      )}

      {mode === "editable" &&
        (isAdding ? (
          <AddItemForm onAdd={handleAdd} onCancel={() => setIsAdding(false)} />
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

type ItemContentProps = {
  item: Equipment;
  mode: "readonly" | "editable";
  onRemoveRequest: () => void;
};

function ItemContent({ item, mode, onRemoveRequest }: ItemContentProps) {
  return (
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
        <span className={styles.attackBonus}>+{item.attackBonus}</span>
      )}
      {item.quantity !== undefined && item.quantity > 1 && (
        <span className={styles.quantity}>x{item.quantity}</span>
      )}
      {mode === "editable" && (
        <button
          type="button"
          onClick={onRemoveRequest}
          className={styles.removeButton}
          aria-label={`Remove ${item.name}`}
        >
          x
        </button>
      )}
    </>
  );
}

type MoneyTagProps = {
  gold: number;
  mode: "readonly" | "editable";
  onGoldChange: (amount: number) => void;
};

function MoneyTag({ gold, mode, onGoldChange }: MoneyTagProps) {
  return (
    <fieldset className={styles.moneyTag} aria-label="Gold pieces">
      <img
        src={resolveIconPath(GOLD_ICON)}
        alt="Gold"
        className={styles.moneyIcon}
      />
      {mode === "editable" ? (
        <div className={styles.moneyControls}>
          <button
            type="button"
            className={styles.moneyButton}
            onClick={() => onGoldChange(Math.max(0, gold - 1))}
            aria-label="Decrease gold"
          >
            -
          </button>
          <span className={styles.moneyAmount}>
            {gold} <span className={styles.moneyLabel}>gp</span>
          </span>
          <button
            type="button"
            className={styles.moneyButton}
            onClick={() => onGoldChange(gold + 1)}
            aria-label="Increase gold"
          >
            +
          </button>
        </div>
      ) : (
        <span className={styles.moneyAmount}>
          {gold} <span className={styles.moneyLabel}>gp</span>
        </span>
      )}
    </fieldset>
  );
}

type AddItemFormProps = {
  onAdd: (item: Equipment) => void;
  onCancel: () => void;
};

function AddItemForm({ onAdd, onCancel }: AddItemFormProps) {
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
