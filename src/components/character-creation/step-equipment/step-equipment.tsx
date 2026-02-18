import { Inventory } from "src/components/inventory/inventory";
import type { CharacterClass } from "src/models/classes";
import { resolveStartingEquipment } from "src/models/starting-equipment";

type StepEquipmentProps = {
  characterClass: CharacterClass;
};

export function StepEquipment({ characterClass }: StepEquipmentProps) {
  const equipment = resolveStartingEquipment(characterClass);

  return (
    <Inventory
      mode="readonly"
      title="Starting Equipment"
      equipment={equipment}
    />
  );
}
