import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT } from "../../theme";
import { FONT_MONO, NEON } from "../neon";
import { FHeadline, FKicker, FScene } from "../FKit";
import { HoloChart } from "../HoloChart";

// Scene 3 — L'acquisition. Demands up, cost down.
export const FScene3: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [16, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const Stat: React.FC<{ big: string; label: string; color: string; delay: number }> = ({ big, label, color, delay }) => (
    <RiseIn delay={delay} y={24}>
      <div style={{ background: "rgba(10,20,45,0.6)", border: `1px solid ${NEON.line}`, borderRadius: 16, padding: "20px 28px", minWidth: 240, boxShadow: `0 0 24px rgba(58,160,255,0.15)` }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color, textShadow: `0 0 16px ${color}` }}>{big}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: NEON.muted }}>{label}</div>
      </div>
    </RiseIn>
  );

  return (
    <FScene dur={dur}>
      <FKicker label="L'acquisition" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <RiseIn delay={12}>
          <HoloChart size={660} progress={progress} />
        </RiseIn>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          <Stat big="▲ Demandes" label="plus de prospects" color={NEON.cyan} delay={96} />
          <Stat big="▼ Coût" label="acquisition réduit" color={NEON.blueGlow} delay={112} />
        </div>
      </div>
      <RiseIn delay={130} y={22}>
        <FHeadline size={72} style={{ textAlign: "center" }}>
          <span style={{ color: NEON.cyan }}>+ de demandes</span>
          <span style={{ color: NEON.muted }}>{"  ·  "}</span>
          <span>− de coûts</span>
        </FHeadline>
      </RiseIn>
    </FScene>
  );
};
