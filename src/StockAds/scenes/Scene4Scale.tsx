import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HexMap } from "../components/HexMap";
import { Bg, Kicker, RiseIn } from "../components/SceneKit";
import { COLORS, FONT } from "../theme";

// Scene 4 — À chaque échelle (0:20–0:27). One centre grows into several across
// a territory. On-screen text: "Indépendant · Franchisé · Réseau".
const WORDS = ["Indépendant", "Franchisé", "Réseau"];

export const Scene4Scale: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [16, 150], [1, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <Bg variant="dark" dur={dur}>
      <AbsoluteFill
        style={{
          padding: "104px 80px 344px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Kicker label="À chaque échelle" onDark delay={4} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <RiseIn delay={12}>
            <HexMap size={640} active={active} onDark />
          </RiseIn>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 58,
          }}
        >
          {WORDS.map((w, i) => {
            const lit = frame > 70 + i * 26;
            return (
              <RiseIn key={w} delay={70 + i * 26} y={20} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span style={{ color: lit ? COLORS.blueSoft : COLORS.white }}>{w}</span>
                {i < WORDS.length - 1 ? (
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
                ) : null}
              </RiseIn>
            );
          })}
        </div>
      </AbsoluteFill>
    </Bg>
  );
};
