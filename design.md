# Design Review: D&D 5e Beginner Character Sheet

## The Vision vs. The Execution

Your stated goal — a **Game Boy 8-bit retro** interface that's **icon-oriented** and **mobile-first** — is ambitious and specific. Let me evaluate how close you are and where the gaps live.

---

## What's Working Brilliantly

### 1. The 4-Color Constraint is Genius
Your `tokens.css` palette (`--shade-0` through `--shade-3`) mirrors the original Game Boy's 4-shade LCD screen. The warm parchment-to-leather tones give it personality beyond a cold DMG-green. This is the single strongest design decision in the project — it makes everything feel cohesive without effort.

### 2. Press Start 2P + No Antialiasing
`-webkit-font-smoothing: none` combined with Press Start 2P is the correct call. Every character looks like it was stamped onto the screen pixel by pixel. The `image-rendering: pixelated` on `<html>` ensures icons don't blur. This is foundational and executed correctly.

### 3. The Boot Animation
The `screen-boot` keyframe animation in `global.css` (dark > light > flicker > settle) perfectly recreates the Game Boy power-on moment. It's a 2.4-second atmospheric detail that most devs would skip. Strong.

### 4. CRT Scanlines
The `body::after` scanline overlay at 9% opacity is subtle enough to not impede readability but present enough to add texture. Good restraint.

### 5. The 8-Bit Arrow in Combat Stats
The `box-shadow` pixel art arrow in `combat-stats.module.css` is a delightful detail — pure CSS pixel art for the breakdown pointer. This is the kind of thing that separates "retro themed" from "actually retro."

### 6. Sound Effects on Every Button
The global click handler in `app.tsx` with `data-sound` variants means the entire app *sounds* 8-bit. Multi-sensory design is rare in web apps.

---

## What Needs Work

### 1. The "Section" Component Feels Like a Web Component, Not a Game Boy Window

Your `section.module.css` uses:
```css
background: var(--shade-1);
border: 3px solid var(--shade-3);
box-shadow: 4px 4px 0 var(--shade-3);
```

This is a good generic 8-bit box, but it doesn't reference any specific Game Boy UI pattern. Real Game Boy games used **double-line window borders** — an outer 1px dark line, a 1px light line, then inner content. Think Pokemon's dialog boxes or the FF Adventure menu frames. Your current approach reads more "modern pixel art indie game" than "DMG hardware."

**Suggestion**: Consider a double-border illusion using `outline` + `border` + `box-shadow` to create a 3-layer frame. Or use `box-shadow` with multiple offsets to draw a pixel-perfect window chrome.

### 2. The Color Palette is Beautiful but Underused for Hierarchy

You have 4 shades + 2 accents (green/red). But looking across your components, almost everything is `shade-1` background with `shade-3` borders and `shade-2` text. The hierarchy is flat:

- Section background = `shade-1`
- Card background = `shade-1`
- Action button background = `shade-1`
- Spell card background = `shade-1`
- Money tag background = `shade-1`

On a Game Boy screen, different UI layers used different shade combinations to create depth. Your top menu already does this well (it's `shade-1` with `shade-3` border/shadow), but the content area below it lacks variation. Consider:
- **Primary containers**: `shade-1` bg (current)
- **Nested/recessed areas**: `shade-0` bg with `shade-2` border (like an inset well)
- **Active/highlighted elements**: `shade-2` bg with `shade-0` text (inverted)
- **Headers/labels**: `shade-3` bg with `shade-0` text (like your ability card label — which does this correctly!)

### 3. No Pixel Grid Alignment

A real Game Boy operated on a 160x144 pixel grid. While you can't recreate that exactly, your spacing tokens (4/8/16/24/32px) don't enforce any visible grid feeling. The layout jumps between `flex` and `grid` without a unified rhythm.

**Suggestion**: Consider a visible 4px or 8px tile grid that all elements snap to. Even adding subtle grid lines (like graph paper) to the `shade-0` background would massively reinforce the retro feel.

### 4. The Stepper/Tab Bar is Weak

Your `stepper.module.css` tabs are functional but don't look like Game Boy UI. They're plain rectangular buttons with no frame chrome. On a Game Boy, tab-like navigation usually used:
- Arrow indicators (`>` or a cursor sprite) pointing at the active item
- Inverted colors for the selected tab (shade-3 bg, shade-0 text)
- A visible cursor/pointer rather than background color change

The current dots-or-tabs approach feels more like a modern mobile stepper than a retro menu system.

### 5. Missing Game Boy "Frame" / Device Chrome

The app is 480px max-width centered on the page — but there's no physical Game Boy frame around it. This is the biggest missed opportunity for the retro aesthetic. The best Game Boy web experiences add:
- A device bezel/frame around the "screen" area
- A visible "screen" inset with the slight greenish/yellowish tint
- Physical buttons below (even if decorative)

Even without full device chrome, just adding a thick outer border with a "screen bevel" effect (inset shadow at the body level) would sell the Game Boy illusion much harder.

### 6. Hover States Are Too Web-Native

In `selection-grid.module.css`:
```css
.card:hover {
  background: var(--shade-1);
}
```
This is a no-op hover (same color). Game Boys didn't have hover — they had **cursor selection**. Your mobile-first design should lean into tap/active states rather than hover. The `button:active { transform: translate(2px, 2px); }` in global.css is good — it simulates a button press. But many interactive elements don't get enough visual feedback on tap.

### 7. No Transition/Animation Language

Beyond the boot animation and the spell-book `rollOut`, there's almost no motion design. Game Boy transitions were distinctive:
- Screen wipes (top-to-bottom reveal)
- Menu slide-ins (from the bottom or right edge)
- Tile-by-tile reveals (staggered grid animations)
- Text that types out character by character

Your content just *appears*. Adding even 2-3 signature transitions would dramatically improve the feel. The `rollOut` animation on the spell book is a start — that easing curve should be replicated across more components.

### 8. The HP Bar Doesn't Feel Game Boy Enough

Your `hp-tracker.module.css` uses flexbox blocks with 2px gaps:
```css
.barContainer { display: flex; gap: 2px; height: 16px; }
```

This is functional but generic. A proper Game Boy HP bar would be:
- Segmented into distinct chunky blocks (you have this)
- With a visible border/frame around the whole bar (like a Pokemon HP tray)
- With color that shifts as it drains (you have the dynamic colors via inline styles)
- With a possible text label like "HP" in pixel font to the left

Consider making the bar taller (24-32px) with more visible segmentation. Right now at 16px it's too thin to feel "chunky" and retro.

### 9. The Ability Cards Are Your Best Component — Lean Into That Pattern

`ability-card.module.css` is the strongest individual component design:
- Full-width `shade-3` banner for the label
- Large centered modifier number
- Smaller score underneath
- Flips to show skills

This pattern of **header banner + centered value + supporting detail** is very Game Boy. But it's only used here. The combat chips, spell cards, and action buttons all have different layout patterns. Unifying them around this "card with dark header banner" pattern would create much stronger visual consistency.

### 10. Missing "Cursor" / Selection Indicator

Game Boy UIs had a distinctive blinking cursor or arrow that pointed at the currently selected item. Your app uses border/shadow changes for selection, which is web-native. Adding a small blinking pixel arrow (CSS animation) that appears next to selected items would be a strong retro touch.

---

## Summary Scorecard

| Aspect | Score | Notes |
|--------|-------|-------|
| **Color Palette** | 9/10 | Warm 4-shade is perfect. Use it more for hierarchy. |
| **Typography** | 8/10 | Press Start 2P is the right call. Size scale is good. |
| **Layout (Mobile)** | 7/10 | 480px max-width works. Needs visible grid rhythm. |
| **Component Design** | 6/10 | Functional but not consistently "Game Boy." Ability cards are the gold standard — replicate that pattern. |
| **Borders/Chrome** | 5/10 | Flat 3px borders everywhere. Needs double-line frames and more variation. |
| **Animation/Motion** | 4/10 | Boot + scanlines are great. Everything else is static. Needs screen transitions, menu slides, tile reveals. |
| **Sound** | 8/10 | Global 8-bit sound on buttons is excellent. |
| **Device Framing** | 3/10 | No Game Boy bezel/chrome. The "screen" doesn't feel like a screen. |
| **Interaction Design** | 5/10 | Active states are good. Missing cursor indicators, typewriter text, and retro selection patterns. |
| **Icon System** | 8/10 | SVG masks with dynamic coloring is smart. Pixelated rendering is correct. Large 64px icons match the icon-first philosophy. |

**Overall: 6.3/10** — Strong foundation with the right aesthetic DNA. The palette, font, and sound create the atmosphere. But the component-level design and motion are still too "modern web app with pixel font" rather than "Game Boy software." The gap between where you are and where you want to be is in the *details* — window chrome, transitions, cursor indicators, and consistent card patterns.

---

## Top 5 Highest-Impact Changes

1. **Add a Game Boy device frame** around the 480px viewport (thick bezel, screen inset shadow, maybe D-pad decoration)
2. **Implement 3-4 retro transitions**: screen wipe between tabs, tile-reveal for grids, typewriter for first-load text
3. **Upgrade the Section/window border** to a double-line or pixel-chrome style that references actual Game Boy dialog boxes
4. **Unify card components** around the ability-card pattern (dark banner header + centered content)
5. **Add a blinking pixel cursor** for selected items and navigation
