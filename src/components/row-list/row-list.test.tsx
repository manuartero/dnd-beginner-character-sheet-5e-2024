import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RowList } from "./row-list";

describe("<RowList />", () => {
  it("renders heading, list, and rows", () => {
    render(
      <RowList
        title="Arms & Armor"
        ariaLabel="Arms and armor"
        items={[
          { index: 0, item: { id: "a" } },
          { index: 1, item: { id: "b" } },
        ]}
        renderItem={(item) => (
          <button type="button" aria-label={`item-${item.id}`}>
            row
          </button>
        )}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Arms & Armor", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Arms and armor" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "item-a" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "item-b" })).toBeInTheDocument();
  });

  it("renders nothing when items are empty", () => {
    render(
      <RowList
        title="Arms & Armor"
        ariaLabel="Arms and armor"
        items={[]}
        renderItem={() => null}
      />,
    );

    expect(
      screen.queryByRole("heading", { name: "Arms & Armor", level: 3 }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: "Arms and armor" }),
    ).not.toBeInTheDocument();
  });
});
