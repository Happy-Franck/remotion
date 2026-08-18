import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TOTAL_FRAMES } from "../theme";
import { FONT_MONO, NEON, rand } from "./theme";

// Layered holographic-space environment with real depth: two star layers
// moving at different speeds (parallax), slow-drifting nebula glows, a
// perspective floor grid, and a refined HUD chrome (progress bar, telemetry,
// corner brackets). Rendered once at the root; scene content crossfades atop.
const FAR_STARS = 90;
const NEAR_STARS = 46;

const StarLayer: React.FC<{ count: number; seed: number; speed: number; size: number; color: string; opacity: number }> = ({
  count,
  seed,
  speed,
  size,
  color,
  opacity,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg width="100%" height="100%" viewBox="0 0 1080 1350" style={{ position: "absolute", inset: 0 }}>
      {new Array(count).fill(0).map((_, i) => {
        const x = rand(i, seed) * 1080;
        const baseY = rand(i, seed + 1) * 1350;
        const y = ((baseY - frame * speed) % 1350 + 1350) % 1350;
        const r = size * (0.5 + rand(i, seed + 2));
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.04 + i * 1.7));
        return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={opacity * tw} />;
      })}
    </svg>
  );
};

export const PrimeBg: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;

  const nebulaX1 = 30 + 10 * Math.sin(frame * 0.006);
  const nebulaY1 = 26 + 6 * Math.cos(frame * 0.005);
  const nebulaX2 = 74 + 8 * Math.cos(frame * 0.004);
  const nebulaY2 = 62 + 8 * Math.sin(frame * 0.0045);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(1300px 1150px at 50% 32%, ${NEON.void2}, ${NEON.void} 72%)` }} />

      {/* drifting nebula glows (violet + blue) for atmospheric depth */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(720px 620px at ${nebulaX1}% ${nebulaY1}%, rgba(124,92,255,0.16), transparent 60%),
                       radial-gradient(760px 640px at ${nebulaX2}% ${nebulaY2}%, rgba(58,160,255,0.14), transparent 62%)`,
        }}
      />

      {/* parallax stars: far (small/slow) then near (bigger/faster) */}
      <StarLayer count={FAR_STARS} seed={1} speed={0.22} size={1.1} color={NEON.violetSoft} opacity={0.5} />
      <StarLayer count={NEAR_STARS} seed={9} speed={0.6} size={1.9} color={NEON.blueGlow} opacity={0.75} />

      {/* animated hex grid */}
      <AbsoluteFill style={{ opacity: 0.4 }}>
        <svg width="100%" height="100%" viewBox="0 0 1080 1350" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="primeHex" width="90" height="104" patternUnits="userSpaceOnUse" patternTransform={`translate(0 ${(frame * 0.3) % 104})`}>
              <path d="M45 0 L90 26 L90 78 L45 104 L0 78 L0 26 Z" fill="none" stroke="rgba(58,160,255,0.08)" strokeWidth={1} />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1080" height="1350" fill="url(#primeHex)" />
        </svg>
      </AbsoluteFill>

      {/* perspective floor grid receding at the bottom, for a sense of ground */}
      <div
        style={{
          position: "absolute",
          left: "-20%",
          right: "-20%",
          bottom: 0,
          height: 260,
          perspective: "420px",
          overflow: "hidden",
          opacity: 0.35,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "rotateX(62deg)",
            transformOrigin: "50% 100%",
            backgroundImage:
              "linear-gradient(90deg, rgba(58,160,255,0.22) 1px, transparent 1px), linear-gradient(0deg, rgba(58,160,255,0.22) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: `0 ${(-frame * 1.4) % 60}px`,
            maskImage: "linear-gradient(0deg, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(0deg, black, transparent 85%)",
          }}
        />
      </div>

      {/* scanlines (subtle) */}
      <AbsoluteFill
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 2px, transparent 4px)",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />

      <AbsoluteFill style={{ background: "radial-gradient(1200px 1300px at 50% 45%, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />

      {/* HUD corner brackets */}
      {[
        { top: 40, left: 40, rot: 0 },
        { top: 40, right: 40, rot: 90 },
        { bottom: 40, right: 40, rot: 180 },
        { bottom: 40, left: 40, rot: 270 },
      ].map((c, i) => (
        <div key={i} style={{ position: "absolute", ...c, width: 46, height: 46, borderTop: `2px solid ${NEON.line}`, borderLeft: `2px solid ${NEON.line}`, rotate: `${c.rot}deg` }} />
      ))}

      {/* top status line + overall progress bar */}
      <div style={{ position: "absolute", top: 44, left: 108, right: 108 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: FONT_MONO, fontSize: 19, letterSpacing: 2, color: NEON.muted }}>
          <span>STOCKADS ▸ ACQUISITION OS</span>
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 9, height: 9, borderRadius: 5, background: NEON.cyan, opacity: 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.18)), boxShadow: `0 0 10px ${NEON.cyan}` }} />
            LIVE
          </span>
        </div>
        <div style={{ marginTop: 10, height: 2, background: "rgba(58,160,255,0.14)", borderRadius: 1 }}>
          <div
            style={{
              width: `${interpolate(progress, [0, 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${NEON.blue}, ${NEON.cyan})`,
              boxShadow: `0 0 8px ${NEON.cyan}`,
            }}
          />
        </div>
      </div>

      {/* sweeping scan beam */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: interpolate(frame % 260, [0, 260], [0, 1350]),
          height: 130,
          background: `linear-gradient(180deg, transparent, ${NEON.blue}14, transparent)`,
          opacity: 0.45,
        }}
      />
    </AbsoluteFill>
  );
};
