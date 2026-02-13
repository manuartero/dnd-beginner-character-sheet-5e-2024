import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionBar } from "./action-bar";

describe("<ActionBar />", () => {
  it("renders the Combat section", () => {
    render(<ActionBar characterClass="fighter" />);
    expect(screen.getByRole("region", { name: "Combat" })).toBeInTheDocument();
  });
});
