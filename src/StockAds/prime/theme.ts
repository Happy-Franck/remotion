import { Easing } from "remotion";
import { NEON as BASE, FONT_MONO, glow, rand, textGlow } from "../futura/neon";

// Prime extends the Futura holographic palette with a depth accent (violet)
// used for parallax layers and comet trails, plus a couple of reusable
// easing curves for the more choreographed motion in this version.
export const NEON = {
  ...BASE,
  violet: "#7C5CFF",
  violetSoft: "#B7A8FF",
  amber: "#FFB454",
} as const;

export { FONT_MONO, glow, rand, textGlow };

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
