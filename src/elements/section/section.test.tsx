import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section } from "./section";

describe("<Section />", () => {
  it("renders a region with the given title", () => {
    render(<Section title="Abilities">content</Section>);
    expect(
      screen.getByRole("region", { name: "Abilities" }),
    ).toBeInTheDocument();
  });
});
