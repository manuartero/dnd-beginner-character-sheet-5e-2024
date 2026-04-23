import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Inventory } from "./inventory";

describe("<Inventory />", () => {
  it("renders the Inventory section in editable mode", () => {
    render(
      <Inventory
        mode="editable"
        equipment={[
          {
            name: "Longsword",
            type: "weapon",
            damage: { dice: "1d8", type: "slashing" },
            properties: [],
          },
        ]}
        onEquipmentChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Inventory" }),
    ).toBeInTheDocument();
  });

  it("renders a custom title in readonly mode", () => {
    render(
      <Inventory
        mode="readonly"
        title="Starting Equipment"
        equipment={[
          {
            name: "Longsword",
            type: "weapon",
            damage: { dice: "1d8", type: "slashing" },
            properties: [],
          },
        ]}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Starting Equipment" }),
    ).toBeInTheDocument();
  });

  it("groups weapons, armor, and shields under Arms & Armor", () => {
    render(
      <Inventory
        mode="readonly"
        equipment={[
          {
            name: "Longsword",
            type: "weapon",
            damage: { dice: "1d8", type: "slashing" },
            properties: [],
          },
          {
            name: "Shield",
            type: "shield",
            armorId: "shield",
            ac: 2,
          },
          {
            name: "Leather Armor",
            type: "armor",
            armorId: "leather-armor",
            ac: 11,
          },
        ]}
      />,
    );
    expect(screen.getByText("Arms & Armor")).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Arms and armor" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Longsword")).toBeInTheDocument();
    expect(screen.getByText("Shield")).toBeInTheDocument();
    expect(screen.getByText("Leather Armor")).toBeInTheDocument();
  });

  it("groups gear items under Adventure Gear", () => {
    render(
      <Inventory
        mode="readonly"
        equipment={[{ name: "Rope", type: "gear" }]}
      />,
    );
    expect(screen.getByText("Adventure Gear")).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Adventure gear" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Rope")).toBeInTheDocument();
  });

  it("renders money with gold tag", () => {
    render(
      <Inventory
        mode="readonly"
        equipment={[{ name: "Gold", type: "money", quantity: 15 }]}
      />,
    );
    expect(screen.getByText("Money")).toBeInTheDocument();
    expect(screen.getByText(/15/)).toBeInTheDocument();
  });

  it("does not render empty subsections", () => {
    render(
      <Inventory
        mode="readonly"
        equipment={[
          {
            name: "Longsword",
            type: "weapon",
            damage: { dice: "1d8", type: "slashing" },
            properties: [],
          },
        ]}
      />,
    );
    expect(screen.getByText("Arms & Armor")).toBeInTheDocument();
    expect(screen.queryByText("Adventure Gear")).not.toBeInTheDocument();
    expect(screen.queryByText("Money")).not.toBeInTheDocument();
  });

  it("increments gold when + is clicked in editable mode", () => {
    const onChange = vi.fn();
    render(
      <Inventory
        mode="editable"
        equipment={[{ name: "Gold", type: "money", quantity: 15 }]}
        onEquipmentChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Increase gold"));
    expect(onChange).toHaveBeenCalledWith([
      { name: "Gold", type: "money", quantity: 16 },
    ]);
  });

  it("decrements gold when - is clicked in editable mode", () => {
    const onChange = vi.fn();
    render(
      <Inventory
        mode="editable"
        equipment={[{ name: "Gold", type: "money", quantity: 15 }]}
        onEquipmentChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Decrease gold"));
    expect(onChange).toHaveBeenCalledWith([
      { name: "Gold", type: "money", quantity: 14 },
    ]);
  });

  it("does not decrement gold below zero", () => {
    const onChange = vi.fn();
    render(
      <Inventory
        mode="editable"
        equipment={[{ name: "Gold", type: "money", quantity: 0 }]}
        onEquipmentChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Decrease gold"));
    expect(onChange).toHaveBeenCalledWith([
      { name: "Gold", type: "money", quantity: 0 },
    ]);
  });
});
