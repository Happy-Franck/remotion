import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FADE } from "../components/SceneKit";
import { FONT } from "../theme";
import { FONT_MONO, NEON, textGlow } from "./neon";

// Transparent scene wrapper: only the CONTENT crossfades; the space background
// (rendered at the root) stays continuous.
export const FScene: React.FC<{ dur: number; children: React.ReactNode }> = ({
  dur,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE, dur - FADE, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill
        style={{
          padding: "150px 80px 340px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const FKicker: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontFamily: FONT_MONO,
      fontSize: 24,
      letterSpacing: 4,
      textTransform: "uppercase",
      color: NEON.cyan,
      textShadow: textGlow(NEON.cyan, 14),
    }}
  >
    <span style={{ color: NEON.blueGlow }}>[</span>
    {label}
    <span style={{ color: NEON.blueGlow }}>]</span>
  </div>
);

export const FHeadline: React.FC<{
  size?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ size = 82, style, children }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.04,
      letterSpacing: -1,
      color: NEON.white,
      textShadow: textGlow("rgba(58,160,255,0.55)", 26),
      ...style,
    }}
  >
    {children}
  </div>
);
