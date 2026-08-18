import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT } from "../../theme";
import { NetworkMap } from "../NetworkMap";
import { PScene } from "../PKit";
import { EASE_OUT, FONT_MONO, NEON, rand } from "../theme";

const SHARDS = 16;

const shard = (cx: number, cy: number, r: number, rot: number) => {
  const pts = new Array(6).fill(0).map((_, i) => {
    const a = (Math.PI / 180) * (60 * i + rot);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return pts.join(" ");
};

// Scene 6 — Signature. The logo materialises from converging holographic hex
// shards (instead of a plain fade-in), with a flash ring at the moment of
// assembly, over the fully-lit network.
export const PScene6: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const mapScale = interpolate(frame, [0, dur], [0.92, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardOp = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [22, 36], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT });

  const ringP = interpolate(frame, [26, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <PScene dur={dur}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3, scale: String(mapScale) }}>
        <NetworkMap size={880} active={49} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, width: "100%" }}>
        {/* converging hex shards → assemble into the logo card */}
        <div style={{ position: "relative", width: 620, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={620} height={220} viewBox="0 0 620 220" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {new Array(SHARDS).fill(0).map((_, i) => {
              const dx = (rand(i, 11) - 0.5) * 900;
              const dy = (rand(i, 12) - 0.5) * 620;
              const rot0 = (rand(i, 13) - 0.5) * 260;
              const delay = i * 1.1;
              const p = interpolate(frame, [4 + delay, 26 + delay], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              });
              const x = 310 + dx * (1 - p);
              const y = 110 + dy * (1 - p);
              const rot = rot0 * (1 - p);
              const op = interpolate(p, [0, 0.75, 1], [0.95, 0.9, 0]);
              return <polygon key={i} points={shard(x, y, 13, rot)} fill="none" stroke={i % 3 === 0 ? NEON.cyan : NEON.blueGlow} strokeWidth={2} opacity={op} />;
            })}
            {/* flash ring at the moment of assembly */}
            <circle cx={310} cy={110} r={20 + ringP * 260} fill="none" stroke={NEON.cyan} strokeWidth={2} opacity={(1 - ringP) * 0.6} />
          </svg>

          <div style={{ opacity: cardOp, scale: String(cardScale) }}>
            <div style={{ background: "linear-gradient(180deg, rgba(20,34,64,0.85), rgba(10,18,38,0.9))", border: `1.5px solid ${NEON.line}`, borderRadius: 24, padding: "40px 56px", boxShadow: "0 0 60px rgba(58,160,255,0.25), 0 30px 70px rgba(0,0,0,0.5)" }}>
              <div style={{ background: NEON.void2, borderRadius: 14, padding: "20px 28px" }}>
                <Img src={staticFile("stockads-logo.png")} style={{ width: 480, display: "block", filter: "brightness(1.15) contrast(1.05)" }} />
              </div>
            </div>
          </div>
        </div>

        <RiseIn delay={38} y={20} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 58, color: NEON.white, lineHeight: 1.1, textShadow: "0 0 24px rgba(58,160,255,0.5)" }}>
            Prenez l'avantage sur votre marché.
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: NEON.muted, marginTop: 16 }}>
            L'acquisition client dédiée au self-stockage.
          </div>
        </RiseIn>

        <RiseIn delay={60} y={16}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontFamily: FONT_MONO, fontSize: 26, color: NEON.cyan }}>
            <span>PLUS DE CLIENTS</span>
            <span style={{ color: NEON.muted }}>·</span>
            <span>MOINS DE COÛTS</span>
            <span style={{ color: NEON.muted }}>·</span>
            <span>PLUS DE CROISSANCE</span>
          </div>
        </RiseIn>
      </div>
    </PScene>
  );
};
