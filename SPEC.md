# Product Spec

## Vision

A single-page webapp that serves as a **beginner-friendly control panel** for D&D 5e (2024 edition) players. Inspired by the UX of videogames like Baldur's Gate 3: less text, more icons, and a clear answer to the most common beginner question — *"what can I actually do?"*

There are plenty of traditional character sheets out there (including the official one), but they are designed for people who already understand D&D. This app targets **first-time players sitting at a real table**, giving them an at-a-glance dashboard of their options during play.

## Core Principles

- **Icons over text.** Every action, spell, and item should have a visual representation. Minimize reading.
- **"This is your menu."** Combat actions should feel like a videogame action bar — a clear, finite set of things you can do right now.
- **Single page, no navigation.** Everything lives on one screen. Detail is revealed through popups, accordions, or card expansions — never by navigating away.
- **Mobile-first.** Designed to be used on a phone or tablet at the table during a live session.
- **Progressive complexity.** Start extremely simple (level 1, three classes) and expand over time.

## Initial Scope

### Supported Classes (Level 1 only)

- **Fighter**
- **Rogue**
- **Wizard**

More classes and levels will be added incrementally.

### Character Data

Players fill in their own character data (stats, spells, equipment). The app is the UI layer, not a character builder. Predefined options (e.g. spell lists per class) guide input.

### Key UI Sections

1. **Character Identity** — Name, class, level, race. Minimal, top of screen.
2. **Ability Scores & Modifiers** — Compact visual display (icons per ability).
3. **HP Tracker** — Current / max, simple tap to adjust.
4. **Combat Action Bar** — The core of the app. Shows what this character can do on their turn:
   - **Action** (Attack, Cast a Spell, Dash, Dodge, etc.)
   - **Bonus Action** (class-dependent, e.g. Cunning Action for Rogue)
   - **Reaction** (e.g. Opportunity Attack)
   - Each option represented as an icon with a short label.
5. **Spell Cards** (Wizard) — Spells displayed as visual cards showing: icon, name, damage type (with icon), range, components. Tap to expand for full description.
6. **Equipment & Weapons** — What you're carrying, with attack bonus and damage at a glance.
7. **Skills & Proficiencies** — Compact list, highlight what you're proficient in.

### Iconography

Heavy use of icons throughout. Source TBD — either a purchased icon pack (~1800 icons) or AI-generated. Icons represent: damage types, actions, abilities, spells, equipment, conditions.

## Non-Goals (for now)

- Character creation wizard / builder
- Multi-page navigation or routing
- Backend / persistence (local storage is fine for MVP)
- Multiplayer or DM-facing tools
- Levels beyond 1
- Classes beyond Fighter, Rogue, Wizard
