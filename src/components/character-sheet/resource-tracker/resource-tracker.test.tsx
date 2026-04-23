import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceTracker } from "./resource-tracker";

import type { CharacterResource } from "src/models/class/class-resources";

vi.mock("src/lib/icons", () => ({
  resolveIconPath: (pseudo: string) => `/mocked/${pseudo}.svg`,
}));

function makeResource(
  resourceId: string,
  current: number,
  max: number,
): CharacterResource {
  return { resourceId, current, max } as CharacterResource;
}

describe("<ResourceTracker />", () => {
  it("returns null when resources array is empty", () => {
    const { container } = render(
      <ResourceTracker
        characterClass="fighter"
        resources={[]}
        onResourceChange={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders short-rest resources under Short Rest section", () => {
    render(
      <ResourceTracker
        characterClass="fighter"
        resources={[makeResource("second-wind", 1, 1)]}
        onResourceChange={vi.fn()}
      />,
    );
    const shortRest = screen.getByRole("group", { name: "Short Rest" });
    expect(shortRest).toBeInTheDocument();
    expect(
      within(shortRest).getByRole("button", { name: /2WND/i }),
    ).toBeInTheDocument();
  });

  it("renders long-rest resources under Long Rest section", () => {
    render(
      <ResourceTracker
        characterClass="barbarian"
        resources={[makeResource("rage", 2, 2)]}
        onResourceChange={vi.fn()}
      />,
    );
    const longRest = screen.getByRole("group", { name: "Long Rest" });
    expect(longRest).toBeInTheDocument();
    expect(within(longRest).getAllByRole("button")).toHaveLength(2);
  });

  it("renders correct number of chips per resource (one per max)", () => {
    render(
      <ResourceTracker
        characterClass="barbarian"
        resources={[makeResource("rage", 3, 3)]}
        onResourceChange={vi.fn()}
      />,
    );
    const longRest = screen.getByRole("group", { name: "Long Rest" });
    expect(within(longRest).getAllByRole("button")).toHaveLength(3);
  });

  it("separates short-rest and long-rest resources for cleric", () => {
    render(
      <ResourceTracker
        characterClass="cleric"
        resources={[
          makeResource("channel-divinity", 1, 1),
          makeResource("spell-slot-1st", 2, 2),
        ]}
        onResourceChange={vi.fn()}
      />,
    );
    const shortRest = screen.getByRole("group", { name: "Short Rest" });
    const longRest = screen.getByRole("group", { name: "Long Rest" });
    expect(within(shortRest).getAllByRole("button")).toHaveLength(1);
    expect(within(longRest).getAllByRole("button")).toHaveLength(2);
  });

  it("marks spent chips as disabled (current < max)", () => {
    render(
      <ResourceTracker
        characterClass="barbarian"
        resources={[makeResource("rage", 1, 3)]}
        onResourceChange={vi.fn()}
      />,
    );
    const buttons = screen
      .getByRole("group", { name: "Long Rest" })
      .querySelectorAll("button");
    const enabled = Array.from(buttons).filter((b) => !b.disabled);
    const disabled = Array.from(buttons).filter((b) => b.disabled);
    expect(enabled).toHaveLength(1);
    expect(disabled).toHaveLength(2);
  });

  it("short-rest highlight marks only short-rest spent chips as 'will restore'", () => {
    render(
      <ResourceTracker
        characterClass="cleric"
        resources={[
          makeResource("channel-divinity", 0, 1),
          makeResource("spell-slot-1st", 0, 2),
        ]}
        onResourceChange={vi.fn()}
        highlightResetType="short-rest"
      />,
    );
    // channel-divinity is short-rest for cleric → should pulse
    expect(
      screen.getByRole("button", { name: /CHDIV: will restore/i }),
    ).toBeInTheDocument();
    // spell-slot-1st is long-rest → should NOT pulse
    expect(
      screen.queryByRole("button", { name: /SL.*will restore/i }),
    ).not.toBeInTheDocument();
  });

  it("long-rest highlight marks all spent chips as 'will restore'", () => {
    render(
      <ResourceTracker
        characterClass="cleric"
        resources={[
          makeResource("channel-divinity", 0, 1),
          makeResource("spell-slot-1st", 0, 2),
        ]}
        onResourceChange={vi.fn()}
        highlightResetType="long-rest"
      />,
    );
    // both short-rest and long-rest chips should pulse
    expect(
      screen.getByRole("button", { name: /CHDIV: will restore/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /SL.*will restore/i }),
    ).toHaveLength(2);
  });

  it("calls onResourceChange with decremented current on chip click", () => {
    vi.useFakeTimers();
    const onResourceChange = vi.fn();

    render(
      <ResourceTracker
        characterClass="fighter"
        resources={[makeResource("second-wind", 1, 1)]}
        onResourceChange={onResourceChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /2WND/i }));
    expect(onResourceChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(320);
    });
    expect(onResourceChange).toHaveBeenCalledWith("second-wind", 0);

    vi.useRealTimers();
  });
});
