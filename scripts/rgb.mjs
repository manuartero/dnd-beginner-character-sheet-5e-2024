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
