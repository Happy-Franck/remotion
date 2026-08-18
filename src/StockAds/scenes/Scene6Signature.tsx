import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { HexMap } from "../components/HexMap";
import { Bg, RiseIn } from "../components/SceneKit";
import { COLORS, FONT } from "../theme";

// Scene 6 — Signature (0:34–0:40). Official logo + expanded network. Final lift.
export const Scene6Signature: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const mapScale = interpolate(frame, [0, dur], [0.9, 1.08], {
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
    <Bg variant="dark" dur={dur}>
      {/* expanding network behind */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 0.28 }}>
        <div style={{ scale: String(mapScale) }}>
          <HexMap size={900} active={49} onDark />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: "150px 90px 210px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* official logo on a light card (used as-is) */}
        <div style={{ opacity: cardOp, scale: String(cardScale) }}>
          <div
            style={{
              background: COLORS.paper,
              borderRadius: 28,
              padding: "42px 60px",
              boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
            }}
          >
            <Img src={staticFile("stockads-logo.png")} style={{ width: 560, display: "block" }} />
          </div>
        </div>

        <RiseIn delay={34} y={22} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 60,
              color: COLORS.white,
              lineHeight: 1.1,
            }}
          >
            Prenez l'avantage sur votre marché.
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 34,
              color: COLORS.mutedOnDark,
              marginTop: 16,
            }}
          >
            L'acquisition client dédiée au self-stockage.
          </div>
        </RiseIn>

        <RiseIn delay={58} y={16}>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 30,
              color: COLORS.blueSoft,
            }}
          >
            <span>Plus de clients</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span>Moins de coûts</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span>Plus de croissance</span>
          </div>
        </RiseIn>
      </AbsoluteFill>
    </Bg>
  );
};
