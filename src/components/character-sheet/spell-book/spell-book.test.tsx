import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpellBook } from "./spell-book";

import type { Spell } from "src/models/spells";

function createSpell({
  id,
  name,
  level,
  description,
}: {
  id: string;
  name: string;
  level: number;
  description: string;
}): Spell {
  return {
    id,
    name,
    level,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    concentration: false,
    ritual: false,
    description,
  };
}

describe("<SpellBook />", () => {
  it("shows only mode buttons initially, then shows grid on button click", () => {
    const cantrip = createSpell({
      id: "cantrip-1",
      name: "Cantrip 1",
      level: 0,
      description: "Cantrip description",
    });
    const level1 = createSpell({
      id: "level1-1",
      name: "Level 1 Spell",
      level: 1,
      description: "Level 1 description",
    });

    render(
      <SpellBook
        availableCantrips={[cantrip]}
        availableLevel1={[level1]}
        selectedSpells={[]}
        cantripLimit={3}
        level1Limit={6}
        onSpellsChange={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Prepare spells below to add them to your spell book."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Prepare Cantrips/i }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.queryByRole("button", { name: /Cantrip 1/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Level 1 Spell" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Spells" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Prepare Cantrips/i }));

    expect(
      screen.getByRole("button", { name: /Cantrip 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Level 1 Spell" }),
    ).not.toBeInTheDocument();
  });

  it("switches to level 1 preparation mode", () => {
    const cantrip = createSpell({
      id: "cantrip-1",
      name: "Cantrip 1",
      level: 0,
      description: "Cantrip description",
    });
    const level1 = createSpell({
      id: "level1-1",
      name: "Level 1 Spell",
      level: 1,
      description: "Level 1 description",
    });

    render(
      <SpellBook
        availableCantrips={[cantrip]}
        availableLevel1={[level1]}
        selectedSpells={[]}
        cantripLimit={3}
        level1Limit={6}
        onSpellsChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Prepare Level 1/i }));

    expect(
      screen.getByRole("button", { name: /Level 1 Spell/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cantrip 1" }),
    ).not.toBeInTheDocument();
  });

  it("renders expanded description before the next row, not at the section bottom", () => {
    const cantrips = [
      createSpell({
        id: "c-1",
        name: "Cantrip 1",
        level: 0,
        description: "Description 1",
      }),
      createSpell({
        id: "c-2",
        name: "Cantrip 2",
        level: 0,
        description: "Description 2",
      }),
      createSpell({
        id: "c-3",
        name: "Cantrip 3",
        level: 0,
        description: "Description 3",
      }),
      createSpell({
        id: "c-4",
        name: "Cantrip 4",
        level: 0,
        description: "Description 4",
      }),
    ];

    render(
      <SpellBook
        availableCantrips={cantrips}
        availableLevel1={[]}
        selectedSpells={[]}
        cantripLimit={4}
        level1Limit={0}
        onSpellsChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Prepare Cantrips/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cantrip 1/i }));

    const description = screen.getByText("Description 1");
    const fourthCard = screen.getByRole("button", { name: /Cantrip 4/i });

    expect(
      description.compareDocumentPosition(fourthCard) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("stages spells and commits only when pressing commit button", () => {
    const cantrip = createSpell({
      id: "c-1",
      name: "Cantrip 1",
      level: 0,
      description: "Description 1",
    });
    const onSpellsChange = vi.fn();

    render(
      <SpellBook
        availableCantrips={[cantrip]}
        availableLevel1={[]}
        selectedSpells={[]}
        cantripLimit={3}
        level1Limit={0}
        onSpellsChange={onSpellsChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Prepare Cantrips/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cantrip 1/i }));

    expect(screen.getByText("Staged")).toBeInTheDocument();
    expect(onSpellsChange).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getByRole("button", { name: /Commit to Spell Book/i }),
    );

    expect(onSpellsChange).toHaveBeenCalledWith([cantrip]);
  });

  it("removes staged spell when clicked in spell book", () => {
    const cantrip = createSpell({
      id: "c-1",
      name: "Cantrip 1",
      level: 0,
      description: "Description 1",
    });

    render(
      <SpellBook
        availableCantrips={[cantrip]}
        availableLevel1={[]}
        selectedSpells={[]}
        cantripLimit={3}
        level1Limit={0}
        onSpellsChange={vi.fn()}
      />,
    );

    fireEvent.click(
      within(screen.getByRole("region", { name: "Prepare Spells" })).getByRole(
        "button",
        { name: /Prepare Cantrips/i },
      ),
    );
    fireEvent.click(
      within(screen.getByRole("region", { name: "Prepare Spells" })).getByRole(
        "button",
        { name: /Cantrip 1/i },
      ),
    );
    fireEvent.click(
      within(screen.getByRole("region", { name: "Spell Book" })).getByRole(
        "button",
        { name: /Cantrip 1/i },
      ),
    );

    expect(screen.queryByText("Staged")).not.toBeInTheDocument();
  });
});
