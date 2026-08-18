import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SCENES } from "../theme";
import { NEON } from "./theme";

const CUTS = Object.values(SCENES)
  .slice(1)
  .map((s) => s.from);

const WINDOW = 10; // frames of glitch either side of a cut

// A brief holographic "glitch wipe" plays across every scene cut: a bright
// scan bar sweep plus a couple of RGB-split flicker frames. More eventful
// than a flat crossfade, and gives the transition whoosh sfx something to
// visually land on.
export const SceneTransition: React.FC = () => {
  const frame = useCurrentFrame();

  const cut = CUTS.find((c) => Math.abs(frame - c) <= WINDOW);
  if (cut === undefined) {
    return null;
  }

  const d = frame - cut; // -WINDOW..WINDOW
  const t = (d + WINDOW) / (WINDOW * 2); // 0..1
  const barY = t * 1350;
  const flicker = Math.abs(d) <= 3;
  const flickerStrength = flicker ? 1 - Math.abs(d) / 3 : 0;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* scan bar sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: barY - 60,
          height: 120,
          background: `linear-gradient(180deg, transparent, ${NEON.cyan}55, ${NEON.white}22, ${NEON.cyan}55, transparent)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: barY - 1.5,
          height: 3,
          background: NEON.white,
          boxShadow: `0 0 24px 6px ${NEON.cyan}`,
          opacity: 0.9,
        }}
      />

      {/* RGB-split glitch flicker right at the cut */}
      {flicker ? (
        <>
          <AbsoluteFill
            style={{
              background: "rgba(70,228,255,0.06)",
              mixBlendMode: "screen",
              translate: `${flickerStrength * 6}px 0px`,
              opacity: flickerStrength,
            }}
          />
          <AbsoluteFill
            style={{
              background: "rgba(124,92,255,0.06)",
              mixBlendMode: "screen",
              translate: `${-flickerStrength * 6}px 0px`,
              opacity: flickerStrength,
            }}
          />
          <AbsoluteFill style={{ background: NEON.white, opacity: flickerStrength * 0.06 }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
