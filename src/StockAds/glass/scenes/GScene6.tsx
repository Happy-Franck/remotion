import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GReveal, GScene } from "../GKit";
import { GlassMap } from "../GlassMap";
import { FONT, GLASS, glassShadow, rand } from "../theme";

const DUST = 18;

// Scene 6 — Signature. The logo sits on an elegant glass card with a light
// sweep reflection passing over it, and soft light dust drifting upward —
// the calm, premium counterpart to Prime's converging-shard assembly.
export const GScene6: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cardOp = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardScale = interpolate(frame, [8, 30], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sweepX = interpolate(frame % 130, [0, 130], [-160, 160]);

  return (
    <GScene dur={dur}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.22 }}>
        <GlassMap size={860} active={49} />
      </div>

      {/* drifting light dust */}
      <div style={{ position: "absolute", inset: 0 }}>
        {new Array(DUST).fill(0).map((_, i) => {
          const x = rand(i, 31) * 100;
          const baseY = rand(i, 32) * 100;
          const y = ((baseY * 100 - frame * (0.3 + rand(i, 33) * 0.5)) % 1350 + 1350) % 1350;
          const size = 4 + rand(i, 34) * 8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: i % 3 === 0 ? GLASS.cyan : GLASS.blue,
                opacity: 0.28,
                filter: "blur(1px)",
              }}
            />
          );
        })}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
        <div style={{ opacity: cardOp, scale: String(cardScale) }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 26, background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: glassShadow(1.1), padding: "42px 60px" }}>
            <Img src={staticFile("stockads-logo.png")} style={{ width: 560, display: "block" }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${sweepX}%`,
                width: "40%",
                background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.9), transparent)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>

        <GReveal delay={34} y={20} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 58, color: GLASS.ink, lineHeight: 1.1 }}>
            Prenez l'avantage sur votre marché.
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 30, color: GLASS.inkSoft, marginTop: 16 }}>
            L'acquisition client dédiée au self-stockage.
          </div>
        </GReveal>

        <GReveal delay={58} y={16}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontFamily: FONT, fontWeight: 600, fontSize: 28, color: GLASS.blueDeep }}>
            <span>Plus de clients</span>
            <span style={{ color: GLASS.inkSoft }}>·</span>
            <span>Moins de coûts</span>
            <span style={{ color: GLASS.inkSoft }}>·</span>
            <span>Plus de croissance</span>
          </div>
        </GReveal>
      </div>
    </GScene>
  );
};
