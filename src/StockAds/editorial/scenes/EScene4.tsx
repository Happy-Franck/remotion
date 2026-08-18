import { interpolate, useCurrentFrame } from "remotion";
import { Bg, Kicker, RiseIn } from "../../components/SceneKit";
import { COLORS, FONT } from "../../theme";
import { rand } from "../../futura/neon";
import { Ring } from "../Ring";

// Scene 4 — À chaque échelle (0:20–0:27). Brief visual: a single centre
// develops, then several centres appear on a map, with the idea of a
// catchment radius (zone de chalandise) around the centre. On-screen text
// (verbatim): "Indépendant · Franchisé · Réseau".
const SATELLITES = 6;

export const EScene4: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const radiusScale = interpolate(frame, [10, 70], [0.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const radiusOpacity = interpolate(frame, [10, 40], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const WORDS = ["Indépendant", "Franchisé", "Réseau"];

  return (
    <Bg variant="dark" dur={dur}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 90px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker label="À chaque échelle" onDark delay={4} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* catchment radius */}
            <div style={{ position: "absolute", scale: String(radiusScale), opacity: radiusOpacity }}>
              <Ring size={380} progress={1} color={COLORS.blueSoft} strokeWidth={1.5} glow={4} />
            </div>

            {/* satellite centres appearing around */}
            <svg width={420} height={420} viewBox="0 0 420 420" style={{ position: "absolute", inset: 0 }}>
              {new Array(SATELLITES).fill(0).map((_, i) => {
                const angle = (Math.PI * 2 * i) / SATELLITES + rand(i, 5) * 0.4;
                const dist = 130 + rand(i, 6) * 40;
                const x = 210 + Math.cos(angle) * dist;
                const y = 210 + Math.sin(angle) * dist;
                const delay = 76 + i * 9;
                const op = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <g key={i} opacity={op}>
                    <line x1={210} y1={210} x2={x} y2={y} stroke="rgba(58,140,240,0.35)" strokeWidth={1} />
                    <circle cx={x} cy={y} r={6} fill={COLORS.blueSoft} style={{ filter: `drop-shadow(0 0 6px ${COLORS.blueSoft})` }} />
                  </g>
                );
              })}
            </svg>

            {/* the individual centre at the heart of it */}
            <Ring size={64} progress={1} color={COLORS.blue} strokeWidth={4} glow={12} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center", fontFamily: FONT, fontWeight: 700, fontSize: 58 }}>
          {WORDS.map((w, i) => (
            <RiseIn key={w} delay={140 + i * 20} y={20} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: COLORS.white }}>{w}</span>
              {i < WORDS.length - 1 ? <span style={{ color: COLORS.mutedOnDark }}>·</span> : null}
            </RiseIn>
          ))}
        </div>
      </div>
    </Bg>
  );
};
