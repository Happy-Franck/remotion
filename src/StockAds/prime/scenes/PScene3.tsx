import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT } from "../../theme";
import { Chart } from "../Chart";
import { PHeadline, PKicker, PScene } from "../PKit";
import { FONT_MONO, NEON } from "../theme";

// Scene 3 — L'acquisition. Demands up, cost down.
export const PScene3: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [16, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const Stat: React.FC<{ big: string; label: string; color: string; delay: number }> = ({ big, label, color, delay }) => (
    <RiseIn delay={delay} y={24}>
      <div style={{ background: "rgba(10,20,45,0.6)", border: `1px solid ${NEON.line}`, borderRadius: 16, padding: "20px 28px", minWidth: 240, boxShadow: "0 0 24px rgba(58,160,255,0.15)" }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color, textShadow: `0 0 16px ${color}` }}>{big}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: NEON.muted }}>{label}</div>
      </div>
    </RiseIn>
  );

  return (
    <PScene dur={dur}>
      <PKicker label="L'acquisition" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <RiseIn delay={12}>
          <Chart size={660} progress={progress} />
        </RiseIn>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          <Stat big="▲ Demandes" label="plus de prospects" color={NEON.cyan} delay={96} />
          <Stat big="▼ Coût" label="acquisition réduit" color={NEON.blueGlow} delay={112} />
        </div>
      </div>
      <PHeadline size={72} delay={130} style={{ textAlign: "center" }} accent={(w) => w.toLowerCase().includes("demandes")}>
        + de demandes · − de coûts
      </PHeadline>
    </PScene>
  );
};
