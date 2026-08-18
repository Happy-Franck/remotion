import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bg, RiseIn } from "../../components/SceneKit";
import { rand } from "../../futura/neon";
import { COLORS, FONT } from "../../theme";
import { Ring } from "../Ring";

const CENTRES = 20;

// Scene 6 — Signature (0:34–0:40). Brief visual: official logo + filled
// centres + a map of the network extending, final rise. On-screen text
// (verbatim, brief §4): "STOCKADS — Prenez l'avantage sur votre marché.
// L'acquisition client dédiée au self-stockage."
export const EScene6: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cardOp = interpolate(frame, [8, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [8, 30], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mapScale = interpolate(frame, [0, dur], [0.95, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Bg variant="dark" dur={dur}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.35, scale: String(mapScale) }}>
        <svg width={760} height={760} viewBox="0 0 760 760">
          {new Array(CENTRES).fill(0).map((_, i) => {
            const angle = rand(i, 41) * Math.PI * 2;
            const dist = 60 + rand(i, 42) * 320;
            const x = 380 + Math.cos(angle) * dist;
            const y = 380 + Math.sin(angle) * dist;
            return <circle key={i} cx={x} cy={y} r={10} fill="none" stroke={COLORS.blueSoft} strokeWidth={2} />;
          })}
        </svg>
      </div>

      <div style={{ position: "absolute", inset: 0, padding: "150px 90px 340px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
        <div style={{ opacity: cardOp, scale: String(cardScale), display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ring size={420} progress={1} color={COLORS.blue} strokeWidth={2} glow={10}>
            <div style={{ background: COLORS.white, borderRadius: 20, padding: "26px 38px" }}>
              <Img src={staticFile("stockads-logo.png")} style={{ width: 300, display: "block" }} />
            </div>
          </Ring>
        </div>

        <RiseIn delay={34} y={20} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color: COLORS.blueSoft, letterSpacing: 1 }}>STOCKADS</div>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 52, color: COLORS.white, lineHeight: 1.14, marginTop: 8 }}>
            Prenez l'avantage sur votre marché.
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 28, color: COLORS.mutedOnDark, marginTop: 14 }}>
            L'acquisition client dédiée au self-stockage.
          </div>
        </RiseIn>
      </div>
    </Bg>
  );
};
