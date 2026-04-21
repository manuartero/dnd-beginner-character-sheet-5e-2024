import { Inventory } from "src/components/inventory/inventory";
import { classes } from "src/models/class/classes";

import type { CharacterClass } from "src/models/class/classes";

type StepEquipmentProps = {
  characterClass: CharacterClass;
};

export function StepEquipment({ characterClass }: StepEquipmentProps) {
  const equipment = classes.startingEquipment({ id: characterClass });

  return (
    <Inventory
      mode="readonly"
      title="Starting Equipment"
      equipment={equipment}
    />
  );
}
