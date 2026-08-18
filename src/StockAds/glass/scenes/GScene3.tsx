import { interpolate, useCurrentFrame } from "remotion";
import { GlassChart } from "../GlassChart";
import { GHeadline, GKicker, GReveal, GScene } from "../GKit";
import { FONT, GLASS, glassShadow } from "../theme";

// Scene 3 — L'acquisition. Demands up, cost down.
export const GScene3: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [16, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const Stat: React.FC<{ big: string; label: string; color: string; delay: number }> = ({ big, label, color, delay }) => (
    <GReveal delay={delay} y={24}>
      <div style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 18, padding: "20px 28px", minWidth: 240, boxShadow: glassShadow(0.5) }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color }}>{big}</div>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 22, color: GLASS.inkSoft }}>{label}</div>
      </div>
    </GReveal>
  );

  return (
    <GScene dur={dur}>
      <GKicker label="L'acquisition" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <GReveal delay={12}>
          <GlassChart size={660} progress={progress} />
        </GReveal>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          <Stat big="↑ Demandes" label="plus de prospects" color={GLASS.blue} delay={96} />
          <Stat big="↓ Coût" label="acquisition réduit" color={GLASS.ink} delay={112} />
        </div>
      </div>
      <GHeadline size={70} delay={130} style={{ textAlign: "center" }} accent={(w) => w.toLowerCase().includes("demandes")}>
        + de demandes · − de coûts
      </GHeadline>
    </GScene>
  );
};
