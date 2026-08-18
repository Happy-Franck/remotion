import { interpolate, useCurrentFrame } from "remotion";
import { FADE } from "../components/SceneKit";
import { EASE_OUT, FONT, GLASS, glassShadow } from "./theme";

export const GScene: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE, dur - FADE, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(frame, [0, dur], [6, -6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, opacity, translate: `0px ${drift}px` }}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 80px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
};

// Small glass "pill" badge, replacing the sci-fi bracket kicker.
export const GKicker: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 20px",
      borderRadius: 999,
      background: GLASS.panel,
      border: `1px solid ${GLASS.border}`,
      boxShadow: glassShadow(0.4),
      fontFamily: FONT,
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      color: GLASS.blueDeep,
    }}
  >
    <span style={{ width: 8, height: 8, borderRadius: 4, background: GLASS.cyan, boxShadow: `0 0 8px ${GLASS.cyan}` }} />
    {label}
  </div>
);

// Headline with a gentle word-by-word rise + soft blur-in (slower, calmer
// than Prime's kinetic reveal — fits the airy, premium tone).
export const GHeadline: React.FC<{
  size?: number;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  children: string;
  accent?: (word: string, i: number) => boolean;
}> = ({ size = 78, delay = 6, stagger = 6, style, children, accent }) => {
  const frame = useCurrentFrame();
  const words = children.split(" ");

  return (
    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1.08, letterSpacing: -0.5, color: GLASS.ink, ...style }}>
      {words.map((w, i) => {
        const wDelay = delay + i * stagger;
        const p = interpolate(frame, [wDelay, wDelay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT,
        });
        const isAccent = accent?.(w, i) ?? false;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              translate: `0px ${(1 - p) * 16}px`,
              filter: `blur(${(1 - p) * 6}px)`,
              color: isAccent ? GLASS.blue : undefined,
              marginRight: "0.28em",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

// Reveal wrapper for arbitrary content (cards, charts).
export const GReveal: React.FC<{ delay?: number; y?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  delay = 0,
  y = 24,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <div style={{ ...style, opacity: p, translate: `0px ${(1 - p) * y}px` }}>
      {children}
    </div>
  );
};
