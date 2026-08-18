import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT_MONO, NEON, rand } from "./neon";

// Persistent holographic space background + HUD chrome. Rendered once at the
// root so the environment is continuous while scene content crossfades on top.
const STARS = 130;

export const FuturaBg: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* deep space gradient */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1300px 1100px at 50% 34%, ${NEON.void2}, ${NEON.void} 70%)`,
        }}
      />

      {/* drifting hex grid (brand motif) */}
      <AbsoluteFill style={{ opacity: 0.5 }}>
        <svg width="100%" height="100%" viewBox="0 0 1080 1350" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern
              id="hexgrid"
              width="90"
              height="104"
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(0 ${(frame * 0.35) % 104})`}
            >
              <path
                d="M45 0 L90 26 L90 78 L45 104 L0 78 L0 26 Z"
                fill="none"
                stroke={NEON.grid}
                strokeWidth={1}
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1080" height="1350" fill="url(#hexgrid)" />
        </svg>
      </AbsoluteFill>

      {/* starfield */}
      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1080 1350">
          {new Array(STARS).fill(0).map((_, i) => {
            const x = rand(i, 1) * 1080;
            const drift = (rand(i, 4) - 0.5) * 40;
            const baseY = rand(i, 2) * 1350;
            const y = (baseY - frame * (0.3 + rand(i, 5) * 0.7)) % 1350;
            const yy = (y + 1350) % 1350;
            const r = 0.6 + rand(i, 3) * 1.8;
            const tw = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.05 + i));
            return (
              <circle
                key={i}
                cx={x + drift}
                cy={yy}
                r={r}
                fill={i % 7 === 0 ? NEON.cyan : NEON.blueGlow}
                opacity={tw * (0.3 + rand(i, 6) * 0.6)}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* scanlines */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 4px)",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />

      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 1300px at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* HUD corner brackets */}
      {[
        { top: 40, left: 40, rot: 0 },
        { top: 40, right: 40, rot: 90 },
        { bottom: 40, right: 40, rot: 180 },
        { bottom: 40, left: 40, rot: 270 },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...c,
            width: 46,
            height: 46,
            borderTop: `2px solid ${NEON.line}`,
            borderLeft: `2px solid ${NEON.line}`,
            rotate: `${c.rot}deg`,
          }}
        />
      ))}

      {/* top HUD status line */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 108,
          right: 108,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: FONT_MONO,
          fontSize: 20,
          letterSpacing: 2,
          color: NEON.muted,
        }}
      >
        <span>STOCKADS ▸ ACQUISITION OS</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: NEON.cyan,
              opacity: 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.18)),
              boxShadow: `0 0 10px ${NEON.cyan}`,
            }}
          />
          LIVE
        </span>
      </div>

      {/* sweeping scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: interpolate(frame % 240, [0, 240], [0, 1350]),
          height: 140,
          background: `linear-gradient(180deg, transparent, ${NEON.blue}18, transparent)`,
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
