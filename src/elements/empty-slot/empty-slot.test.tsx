import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptySlot } from "./empty-slot";

describe("<EmptySlot />", () => {
  it("renders as a named region", () => {
    render(<EmptySlot label="cantrip space" />);
    expect(
      screen.getByRole("region", { name: "cantrip space" }),
    ).toBeInTheDocument();
  });
});
