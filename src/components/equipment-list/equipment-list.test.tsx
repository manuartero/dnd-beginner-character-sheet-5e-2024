import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EquipmentList } from "./equipment-list";

describe("<EquipmentList />", () => {
  it("renders the Equipment section in editable mode", () => {
    render(
      <EquipmentList
        mode="editable"
        equipment={[{ name: "Longsword", type: "weapon" }]}
        onEquipmentChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Equipment" }),
    ).toBeInTheDocument();
  });

  it("renders a custom title in readonly mode", () => {
    render(
      <EquipmentList
        mode="readonly"
        title="Starting Equipment"
        equipment={[{ name: "Longsword", type: "weapon" }]}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Starting Equipment" }),
    ).toBeInTheDocument();
  });
});
