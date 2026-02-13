import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AbilityScores } from "./ability-scores";

describe("<AbilityScores />", () => {
  it("renders the Abilities section", () => {
    render(
      <AbilityScores
        scores={{ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Abilities" }),
    ).toBeInTheDocument();
  });
});
