import { Inventory } from "src/components/inventory/inventory";
import { resolveStartingEquipment } from "src/models/starting-equipment";

import type { CharacterClass } from "src/models/classes";

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
