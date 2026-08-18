import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TOTAL_FRAMES } from "../theme";
import { GLASS, rand } from "./theme";

// Bright studio environment: soft sky gradient, slow-drifting blue/cyan
// bokeh light, a barely-visible hex texture, and a thin top progress line —
// the "room" the glass panels float in for the whole video.
const ORBS = 7;

export const GlassBg: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(165deg, ${GLASS.skyTop} 0%, ${GLASS.skyBottom} 60%, #C9DEF6 100%)` }} />

      {/* drifting soft light orbs */}
      <AbsoluteFill>
        {new Array(ORBS).fill(0).map((_, i) => {
          const baseX = rand(i, 21) * 100;
          const baseY = rand(i, 22) * 100;
          const speed = 0.15 + rand(i, 23) * 0.25;
          const x = baseX + 6 * Math.sin(frame * 0.01 * speed + i);
          const y = baseY + 5 * Math.cos(frame * 0.008 * speed + i * 1.3);
          const size = 260 + rand(i, 24) * 260;
          const hue = i % 2 === 0 ? "rgba(58,160,255,0.16)" : "rgba(34,184,240,0.14)";
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                borderRadius: "50%",
                background: hue,
                filter: "blur(40px)",
                translate: "-50% -50%",
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* faint hex texture */}
      <AbsoluteFill style={{ opacity: 0.35 }}>
        <svg width="100%" height="100%" viewBox="0 0 1080 1350" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="glassHex" width="96" height="110" patternUnits="userSpaceOnUse" patternTransform={`translate(0 ${(frame * 0.18) % 110})`}>
              <path d="M48 0 L96 28 L96 82 L48 110 L0 82 L0 28 Z" fill="none" stroke="rgba(3,105,234,0.06)" strokeWidth={1} />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1080" height="1350" fill="url(#glassHex)" />
        </svg>
      </AbsoluteFill>

      {/* soft top sheen */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5), transparent 30%)" }} />

      {/* thin progress line */}
      <div style={{ position: "absolute", top: 54, left: 108, right: 108, height: 2, background: "rgba(3,105,234,0.12)", borderRadius: 1 }}>
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${GLASS.blue}, ${GLASS.cyan})`,
            boxShadow: `0 0 8px rgba(3,105,234,0.5)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
