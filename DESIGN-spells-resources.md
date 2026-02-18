# Design: Spells & Resources

> Decisions made in design session — Feb 2026.
> Extends SPEC.md with the 4-tab character sheet structure and the resources model.

---

## Tab Structure (Character Sheet)

The character sheet moves from 3 steps to 4:

| Step |     Label     |                      Contents                       |
| ---- | ------------- | --------------------------------------------------- |
| 1    | **Character** | HP, AC, ability scores, rest buttons                |
| 2    | **Battle**    | Combat actions + combat spells + resources          |
| 3    | **Explore**   | Exploration actions + ritual spells + resources     |
| 4    | **Gear**      | Inventory + proficiencies                           |

**Rationale for splitting Battle / Explore:** Beginners always know which context
they're in (sitting at the table in a fight vs. wandering a dungeon). Separating
the tabs removes the cognitive load of "wait, can I cast Alarm in combat?"

---

## Resources

### Mental model

Resources are **independent token pools** — not a hierarchy. Spell Slot L1 and
Spell Slot L2 are as unrelated as "wood" and "rock" in a crafting game. Spending
one does not affect the other.

### Data model

```ts
type Resource = {
  id: string;       // "spell-slot-l1", "rage", "bardic-inspiration", "wild-shape"
  name: string;     // "Spell Slot L1", "Rage", "Bardic Inspiration", "Wild Shape"
  current: number;
  max: number;
  restType: "short" | "long";
};
```

`Character` gains a `resources: Resource[]` field. Each class definition ships
its default resources for each level. The resource UI does not own that logic —
it just renders and mutates the array.

### Per-class resources (levels 1–5 scope)

|   Class   |                     Resources                      | Rest  |
| --------- | -------------------------------------------------- | ----- |
| Barbarian | Rage                                               | long  |
| Bard      | Bardic Inspiration, Spell Slot L1, L2...           | long  |
| Cleric    | Channel Divinity, Spell Slot L1, L2...             | long  |
| Druid     | Wild Shape, Spell Slot L1, L2...                   | long  |
| Fighter   | Second Wind, Action Surge                          | short |
| Monk      | Ki Points                                          | short |
| Paladin   | Lay on Hands (HP pool), Spell Slot L1, L2...       | long  |
| Ranger    | Spell Slot L1, L2...                               | long  |
| Rogue     | _(no resource at low levels — empty section)_      | —     |
| Sorcerer  | Sorcery Points, Spell Slot L1, L2...               | long  |
| Warlock   | Spell Slot L1 _(treated as regular slots for now)_ | short |
| Wizard    | Arcane Recovery, Spell Slot L1, L2...              | long  |

### UI placement

Resources live in **Step 2 (Battle) and Step 3 (Explore)** — where players
actually spend them. Seeing remaining slots while choosing an action removes
the need to switch tabs. Step 1 placement may be revisited later.

Visual: a row of pip indicators per resource, clickable to spend/recover.

```
Spell Slot L1   ●●●○   3 / 4
Spell Slot L2   ●●○○   2 / 2
Bardic Insp.    ●●●○○  3 / 5
```

### Rest buttons

Two prominent buttons in Step 1 (Character tab):

- **Short Rest** — refills `restType: "short"` resources
- **Long Rest** — refills all resources (both short and long)

---

## Spell Casting in the Battle Tab

### Which spells appear where

- **Battle tab** — spells with `ritual: false` and `castingTime: "1 action"` (or "1 bonus action")
- **Explore tab** — spells with `ritual: true`
- **Cantrips** — appear in Battle tab (unlimited, no slot cost)

### "Cast Spell" is an action button

In the combat action grid, "Cast Spell" appears as a regular action button.
Expanding it reveals an inline spell sub-grid — **not a new page or modal**.

```
[ Actions ]
  [Attack]   [Cast Spell ▼]   [Dodge]   [Help]
                  |
                  v  (inline sub-grid, same panel)
  ┌──────────────────────────────────────┐
  │  Slot L1 (2 remaining)               │
  │  [Burning Hands]  [Magic Missile]    │
  │                                      │
  │  Slot L2 (1 remaining)               │
  │  [Scorching Ray]                     │
  │                                      │
  │  Cantrips (unlimited)                │
  │  [Fire Bolt]  [Prestidigitation]     │
  └──────────────────────────────────────┘
```

### Cast flow (Option B — confirmed)

Clicking a spell in the sub-grid opens a detail view (description, range,
components, duration) with a **confirm button**:

> "Cast — uses 1 Spell Slot L1"

Casting decrements the matching resource in Step 1. The confirm step prevents
accidental slot consumption, which matters for beginners.

### Non-spell resources as actions

Rage, Second Wind, Action Surge, etc. appear directly in the action grid — they
ARE the action. Clicking them shows a confirm + description (same Option B
pattern). The confirm also decrements the relevant resource pip in Step 1.

---

## Concentration tracking

Concentration is a **character state**, not a combat action. It can be active
in any context: exploration (Detect Magic, Hold Person on a guard), social
encounters, or combat.

The critical moment is **during combat** — taking damage forces a Constitution
saving throw to keep concentration — but the state itself is not combat-scoped.

**Decision: show concentration as a state badge in Step 1 (Character tab).**
Always visible regardless of which tab the player is on, like a condition
(poisoned, prone, etc.). When a concentration spell is active, a badge shows
the spell name and a button to drop concentration.

---

## Open questions / deferred decisions

- **Preparation mechanic** (Wizard prepares N spells per long rest): deferred.
  When tackled, likely lives in Step 1 under a "Long Rest / Preparation" section.
- **Rogue resources**: no trackable resource at low levels — show an empty
  resources section (no need to hide it).
- **Lay on Hands** (Paladin): it's a pool of HP points, not a use count.
  Needs a numeric input rather than pips. Deferred — decide when Paladin is
  in scope.
