import { Easing } from "remotion";
import { rand } from "../futura/neon";
import { FONT } from "../theme";

// "Glass" is a light, airy counterpoint to the dark sci-fi Futura/Prime
// versions: a bright studio backdrop with frosted glass panels, blue/cyan
// glow accents, anthracite text. Same futuristic material language (blur,
// glow, hex motif, kinetic type) — different mood: premium and daylight
// rather than deep-space HUD.
export const GLASS = {
  skyTop: "#EEF5FF",
  skyBottom: "#D6E7FB",
  blue: "#0369EA",
  blueDeep: "#0257C4",
  cyan: "#22B8F0",
  ink: "#232B33",
  inkSoft: "rgba(35,43,51,0.62)",
  panel: "rgba(255,255,255,0.55)",
  panelStrong: "rgba(255,255,255,0.72)",
  panelDark: "rgba(20,28,40,0.62)",
  border: "rgba(255,255,255,0.65)",
  borderBlue: "rgba(3,105,234,0.35)",
} as const;

export { FONT, rand };

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_SOFT = Easing.bezier(0.4, 0, 0.2, 1);

export const glassShadow = (strength = 1) =>
  `0 ${18 * strength}px ${46 * strength}px rgba(20,50,100,${0.12 * strength}), 0 2px 6px rgba(20,50,100,${0.06 * strength})`;

export const glowText = (color: string, r = 14) => `0 0 ${r}px ${color}`;
