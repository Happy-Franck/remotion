import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SCENES } from "../theme";

const CUTS = Object.values(SCENES)
  .slice(1)
  .map((s) => s.from);

const WINDOW = 16;

// At each cut, a translucent glass pane slides across the frame, refracting
// the content behind it — a calmer, more premium alternative to a hard wipe
// or glitch effect.
export const GlassTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = CUTS.find((c) => Math.abs(frame - c) <= WINDOW);
  if (cut === undefined) {
    return null;
  }

  const d = frame - cut;
  const t = (d + WINDOW) / (WINDOW * 2);
  const x = interpolate(t, [0, 1], [-140, 140]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -100,
          bottom: -100,
          left: `${x}%`,
          width: "60%",
          transform: "skewX(-12deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), rgba(58,160,255,0.25), rgba(255,255,255,0.55), transparent)",
          backdropFilter: "blur(2px)",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
