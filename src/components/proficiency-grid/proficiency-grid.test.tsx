import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProficiencyGrid } from "./proficiency-grid";

describe("<ProficiencyGrid />", () => {
  it("renders proficiency images", () => {
    render(
      <ProficiencyGrid
        proficiencies={{
          "light-armor": true,
          "medium-armor": false,
          "heavy-armor": false,
          shields: false,
          "simple-weapons": true,
          "martial-weapons": false,
          skills: { n: 0, options: [] },
        }}
      />,
    );
    expect(
      screen.getByRole("img", { name: "Light Armor" }),
    ).toBeInTheDocument();
  });
});
