import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterList } from "./character-list";

describe("<CharacterList />", () => {
  it("renders the Characters section with the new button", () => {
    render(
      <CharacterList
        characters={[]}
        onSelect={vi.fn()}
        onNew={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Characters" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+ New" })).toBeInTheDocument();
  });
});
