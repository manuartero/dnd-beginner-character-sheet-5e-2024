# Product Spec

## Vision

A single-page webapp that serves as a **beginner-friendly control panel** for D&D 5e (2024 edition) players. Inspired by the UX of videogames like Baldur's Gate 3: less text, more icons, and a clear answer to the most common beginner question: *"what can I actually do right now?"*

There are plenty of traditional character sheets out there (including the official one), but they are designed for people who already understand D&D. This app targets **first-time players sitting at a real table**, giving them an at-a-glance dashboard of their options during play.

## Core Principles

- **Icons over text.** Every action, spell, and item should have a visual representation. Minimize reading.
- **"This is your menu."** Combat actions should feel like a videogame action bar — a clear, finite set of things you can do right now.
- **Single page, no navigation.** Everything lives on one screen. Detail is revealed through popups, accordions, or card expansions — never by navigating away.
- **Mobile-first.** Designed to be used on a phone or tablet at the table during a live session.
- **Progressive complexity.** Start extremely simple (level 1, three classes) and expand over time.

## Product Structure (Current Direction)

The character sheet is organized into four tabs:

1. **Character** — identity, HP/AC, ability scores, and rest controls.
2. **Battle** — combat actions, non-ritual combat spells, and spendable resources.
3. **Explore** — exploration actions, ritual-focused spell usage, and shared resources context.
4. **Gear** — inventory and proficiencies.

This split reduces cognitive load for beginners by separating "what I do in combat" from "what I do outside combat."

## Initial Scope

### Supported Classes

- Initial baseline: Fighter, Rogue, Wizard at low levels.
- Near-term expansion: extend classes and level support incrementally while preserving beginner-first UX.

### Character Data and Ownership

- Players fill in and maintain character data (stats, spells, equipment, resources).
- The app is a play-time UI layer and assistant, not a full backend-driven builder.
- Local persistence is acceptable in MVP scope.

### Near-Term Gameplay Scope

1. **Action-first turn support**
   - Surface actions, bonus actions, reactions, and castable spells in the Battle tab.
   - Keep interaction inline; avoid navigation and modal-heavy flows.
2. **Resources model**
   - Model resources as independent pools (for example spell slots, rage, second wind uses).
   - Support short-rest and long-rest refill behavior.
3. **Spell cast flow**
   - Treat "Cast Spell" as an action entry point.
   - Confirm before spending slot-based resources to prevent accidental consumption.
4. **Concentration state**
   - Track concentration as persistent character state (not combat-only).
   - Keep concentration visibility prominent from the Character context.
5. **Gear and proficiencies**
   - Keep equipment and proficiencies readable at-a-glance in the Gear tab.

### Iconography

Heavy use of icons throughout. Source TBD — either a purchased icon pack (~1800 icons) or AI-generated. Icons represent: damage types, actions, abilities, spells, equipment, conditions.

## Non-Goals (for now)

- Full rules automation or DM adjudication
- Multi-page navigation or routing
- Backend services and multiplayer syncing
- Multiplayer or DM-facing tools
- Deep optimization for advanced players at the cost of beginner clarity
