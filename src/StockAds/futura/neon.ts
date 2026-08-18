// Futuristic "holographic HUD" palette, built around the brand blue #0369EA.
export const NEON = {
  void: "#05070F",
  void2: "#0A1226",
  blue: "#0369EA",
  blueGlow: "#3AA0FF",
  cyan: "#46E4FF",
  white: "#EAF2FF",
  muted: "rgba(190,214,255,0.6)",
  line: "rgba(58,160,255,0.35)",
  grid: "rgba(58,160,255,0.10)",
} as const;

export const FONT_MONO =
  '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';

// Deterministic pseudo-random in [0,1) for seeded particle fields.
export const rand = (i: number, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const glow = (color: string, r = 16) =>
  `drop-shadow(0 0 ${r * 0.4}px ${color}) drop-shadow(0 0 ${r}px ${color})`;

export const textGlow = (color: string, r = 18) =>
  `0 0 ${r * 0.5}px ${color}, 0 0 ${r}px ${color}`;
