import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CharacterHeader } from "./character-header";

describe("<CharacterHeader />", () => {
  it("renders a banner with the character name", () => {
    render(
      <CharacterHeader
        name="Aragorn"
        race="human"
        characterClass="ranger"
        level={3}
      />,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
