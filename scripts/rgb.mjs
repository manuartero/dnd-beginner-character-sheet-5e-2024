// rgb.mjs
// Pure color conversion helpers (no I/O).

export function toHex(r, g, b) {
  return `#${[r, g, b].map((n) => Number(n).toString(16).padStart(2, "0").toUpperCase()).join("")}`;
}

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16),
  ];
}

export function normalize(hex) {
  return `#${hex.replace("#", "").toUpperCase()}`;
}

// --- HSL ---

export function hexToHsl(hex) {
  const [r, g, b] = hexToRgb(hex).map((n) => n / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [Math.round((h / 6) * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h, s, l) {
  const s1 = s / 100;
  const l1 = l / 100;
  const c = (1 - Math.abs(2 * l1 - 1)) * s1;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l1 - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return toHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  );
}

// Perceptual distance: weights hue difference heavily (×2), lightness normally (×1),
// saturation lightly (×0.5). Hue wraps around 360°.
export function hslDistance(hexA, hexB) {
  const [hA, sA, lA] = hexToHsl(hexA);
  const [hB, sB, lB] = hexToHsl(hexB);
  const dh = Math.min(Math.abs(hA - hB), 360 - Math.abs(hA - hB));
  return Math.sqrt((dh * 2) ** 2 + ((sA - sB) * 0.5) ** 2 + (lA - lB) ** 2);
}
