import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DetailsPanel } from "./details-panel";

describe("<DetailsPanel />", () => {
  it("renders an article with the given name", () => {
    render(
      <DetailsPanel
        icon="/icon.png"
        iconAlt="test"
        name="Fighter"
        description="A master of martial combat"
      >
        <div>details</div>
      </DetailsPanel>,
    );
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Fighter" }),
    ).toBeInTheDocument();
  });
});
