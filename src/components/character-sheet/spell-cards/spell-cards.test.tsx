import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SpellCards } from "./spell-cards";

describe("<SpellCards />", () => {
  it("renders the Spells section", () => {
    render(
      <SpellCards
        spells={[
          {
            id: "fire-bolt",
            name: "Fire Bolt",
            level: 0,
            school: "Evocation",
            castingTime: "1 action",
            range: "120 feet",
            components: "V, S",
            duration: "Instantaneous",
            description: "A beam of fire",
            damage: { dice: "1d10", type: "fire" },
          },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Spells" })).toBeInTheDocument();
  });
});
