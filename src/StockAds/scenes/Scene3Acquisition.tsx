import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GrowthChart } from "../components/GrowthChart";
import { Bg, Headline, Kicker, RiseIn } from "../components/SceneKit";
import { COLORS, FONT } from "../theme";

// Scene 3 — L'acquisition (0:13–0:20). Demands up, acquisition cost down.
// On-screen text: "+ de demandes / − de coûts".
export const Scene3Acquisition: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [16, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const Stat: React.FC<{ big: string; label: string; color: string; delay: number }> = ({
    big,
    label,
    color,
    delay,
  }) => (
    <RiseIn delay={delay} y={26}>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.paperEdge}`,
          borderRadius: 20,
          padding: "22px 30px",
          minWidth: 240,
          boxShadow: "0 12px 30px rgba(20,30,60,0.06)",
        }}
      >
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 46, color }}>{big}</div>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 24, color: COLORS.mutedOnLight }}>
          {label}
        </div>
      </div>
    </RiseIn>
  );

  return (
    <Bg variant="light" dur={dur}>
      <AbsoluteFill
        style={{
          padding: "104px 80px 344px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Kicker label="L'acquisition" delay={4} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
          <RiseIn delay={12}>
            <GrowthChart size={640} progress={progress} />
          </RiseIn>
          <div style={{ display: "flex", gap: 26, justifyContent: "center" }}>
            <Stat big="↑ Demandes" label="plus de prospects" color={COLORS.blue} delay={96} />
            <Stat big="↓ Coût" label="d'acquisition réduit" color={COLORS.anthracite} delay={112} />
          </div>
        </div>

        <Headline delay={130} size={70} style={{ textAlign: "center" }}>
          <span style={{ color: COLORS.blue }}>+ de demandes</span>
          {"  ·  "}
          <span>− de coûts</span>
        </Headline>
      </AbsoluteFill>
    </Bg>
  );
};
