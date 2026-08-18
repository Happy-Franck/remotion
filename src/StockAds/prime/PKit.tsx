import { interpolate, useCurrentFrame } from "remotion";
import { FADE } from "../components/SceneKit";
import { FONT } from "../theme";
import { EASE_OUT, FONT_MONO, NEON, textGlow } from "./theme";

// Scene wrapper: crossfades content (background stays continuous) and adds a
// very slight breathing scale so the frame feels alive rather than static.
export const PScene: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE, dur - FADE, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const breathe = 1 + 0.012 * Math.sin((frame / dur) * Math.PI);

  return (
    <div style={{ position: "absolute", inset: 0, opacity, scale: String(breathe) }}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 80px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
};

// HUD label that types itself out character by character with a blinking cursor.
export const PKicker: React.FC<{ label: string; delay?: number }> = ({ label, delay = 0 }) => {
  const frame = useCurrentFrame();
  const chars = Math.round(
    interpolate(frame, [delay, delay + label.length * 1.1], [0, label.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const done = chars >= label.length;
  const cursorOn = !done || Math.floor(frame / 12) % 2 === 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: NEON.cyan, textShadow: textGlow(NEON.cyan, 14) }}>
      <span style={{ color: NEON.blueGlow }}>[</span>
      <span>
        {label.slice(0, chars)}
        <span style={{ opacity: cursorOn ? 1 : 0 }}>▍</span>
      </span>
      <span style={{ color: NEON.blueGlow }}>]</span>
    </div>
  );
};

// Headline that reveals word by word with a blur + rise, for a more
// deliberate, kinetic-typography feel than a single fade-in block.
export const PHeadline: React.FC<{
  size?: number;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  children: string;
  accent?: (word: string, i: number) => boolean;
}> = ({ size = 80, delay = 6, stagger = 5, style, children, accent }) => {
  const frame = useCurrentFrame();
  const words = children.split(" ");

  return (
    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1.06, letterSpacing: -1, color: NEON.white, ...style }}>
      {words.map((w, i) => {
        const wDelay = delay + i * stagger;
        const p = interpolate(frame, [wDelay, wDelay + 16], [0, 1], {
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
              translate: `0px ${(1 - p) * 18}px`,
              filter: `blur(${(1 - p) * 8}px)`,
              color: isAccent ? NEON.cyan : undefined,
              textShadow: isAccent ? textGlow(NEON.cyan, 22) : textGlow("rgba(58,160,255,0.5)", 24),
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
