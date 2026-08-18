import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { COLORS, FONT } from "../theme";

export const FADE = 12;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Variant = "light" | "dark" | "blue";

const BG: Record<Variant, string> = {
  light: COLORS.paper,
  dark: COLORS.anthracite,
  blue: COLORS.blue,
};

// Scene background with crossfade in/out and a subtle brand texture.
export const Bg: React.FC<{
  variant: Variant;
  dur: number;
  children: React.ReactNode;
}> = ({ variant, dur, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, FADE, dur - FADE, dur],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const onDark = variant !== "light";
  const dot = onDark ? "rgba(255,255,255,0.05)" : "rgba(53,52,52,0.05)";
  const glow =
    variant === "blue"
      ? "radial-gradient(1200px 900px at 50% 26%, rgba(255,255,255,0.22), transparent 60%)"
      : onDark
        ? "radial-gradient(1100px 850px at 50% 30%, rgba(3,105,234,0.18), transparent 62%)"
        : "radial-gradient(1100px 850px at 50% 28%, rgba(3,105,234,0.08), transparent 62%)";

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ backgroundColor: BG[variant] }} />
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${dot} 1.5px, transparent 1.6px)`,
          backgroundSize: "38px 38px",
        }}
      />
      <AbsoluteFill style={{ background: glow }} />
      {children}
    </AbsoluteFill>
  );
};

// Rise + fade entrance, driven by local scene frame.
export const RiseIn: React.FC<{
  delay?: number;
  y?: number;
  durf?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, y = 30, durf = 18, style, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + durf], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  return (
    <div style={{ ...style, opacity: p, translate: `0px ${(1 - p) * y}px` }}>
      {children}
    </div>
  );
};

// Small brand kicker (scene label) shown near the top.
export const Kicker: React.FC<{ label: string; onDark?: boolean; delay?: number }> = ({
  label,
  onDark = false,
  delay = 0,
}) => (
  <RiseIn delay={delay} y={16}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 26,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: onDark ? COLORS.blueSoft : COLORS.blue,
      }}
    >
      <span
        style={{
          width: 34,
          height: 4,
          borderRadius: 2,
          background: onDark ? COLORS.blueSoft : COLORS.blue,
        }}
      />
      {label}
    </div>
  </RiseIn>
);

// Big on-screen headline (Poppins Bold), per brief.
export const Headline: React.FC<{
  onDark?: boolean;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ onDark = false, delay = 6, size = 76, style, children }) => (
  <RiseIn delay={delay} y={26}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: -1,
        color: onDark ? COLORS.white : COLORS.anthracite,
        ...style,
      }}
    >
      {children}
    </div>
  </RiseIn>
);
