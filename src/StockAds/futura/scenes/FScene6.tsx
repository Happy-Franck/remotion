import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT } from "../../theme";
import { FONT_MONO, NEON } from "../neon";
import { FScene } from "../FKit";
import { NeonMap } from "../NeonMap";

// Scene 6 — Signature. Official logo on a holo panel + the fully-lit network.
export const FScene6: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const mapScale = interpolate(frame, [0, dur], [0.92, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(frame, [8, 30], [0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOp = interpolate(frame, [8, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <FScene dur={dur}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.3,
          scale: String(mapScale),
        }}
      >
        <NeonMap size={880} active={49} pulse={0.6} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
        <div style={{ opacity: cardOp, scale: String(cardScale) }}>
          <div
            style={{
              background: "linear-gradient(180deg, rgba(20,34,64,0.85), rgba(10,18,38,0.9))",
              border: `1.5px solid ${NEON.line}`,
              borderRadius: 24,
              padding: "40px 56px",
              boxShadow: `0 0 60px rgba(58,160,255,0.25), 0 30px 70px rgba(0,0,0,0.5)`,
            }}
          >
            <div style={{ background: NEON.void2, borderRadius: 14, padding: "20px 28px" }}>
              <Img src={staticFile("stockads-logo.png")} style={{ width: 480, display: "block", filter: "brightness(1.15) contrast(1.05)" }} />
            </div>
          </div>
        </div>

        <RiseIn delay={34} y={20} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 58, color: NEON.white, lineHeight: 1.1, textShadow: `0 0 24px rgba(58,160,255,0.5)` }}>
            Prenez l'avantage sur votre marché.
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: NEON.muted, marginTop: 16 }}>
            L'acquisition client dédiée au self-stockage.
          </div>
        </RiseIn>

        <RiseIn delay={58} y={16}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontFamily: FONT_MONO, fontSize: 26, color: NEON.cyan }}>
            <span>PLUS DE CLIENTS</span>
            <span style={{ color: NEON.muted }}>·</span>
            <span>MOINS DE COÛTS</span>
            <span style={{ color: NEON.muted }}>·</span>
            <span>PLUS DE CROISSANCE</span>
          </div>
        </RiseIn>
      </div>
    </FScene>
  );
};
