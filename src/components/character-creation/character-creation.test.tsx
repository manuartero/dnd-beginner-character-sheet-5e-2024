import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterCreation } from "./character-creation";

describe("<CharacterCreation />", () => {
  it("renders the first step without crashing", () => {
    render(<CharacterCreation onSave={vi.fn()} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });
});
