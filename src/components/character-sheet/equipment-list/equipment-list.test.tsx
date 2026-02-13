import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EquipmentList } from "./equipment-list";

describe("<EquipmentList />", () => {
  it("renders the Equipment section", () => {
    render(
      <EquipmentList
        equipment={[{ name: "Longsword", type: "weapon" }]}
        onEquipmentChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Equipment" }),
    ).toBeInTheDocument();
  });
});
