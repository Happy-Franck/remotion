import { interpolate, useCurrentFrame } from "remotion";
import { Bg, Headline, Kicker } from "../../components/SceneKit";
import { COLORS } from "../../theme";

// Scene 3 — L'acquisition (0:13–0:20). Brief visual: a chart where the
// acquisition cost falls while the demand curve rises. On-screen text
// (verbatim): "+ de demandes / − de coûts".
const demand = "10,150 70,138 130,110 190,70 250,42 300,26";
const cost = "10,30 70,46 130,80 190,120 250,150 300,168";

export const EScene3: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [16, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const off = 100 - progress * 100;

  return (
    <Bg variant="light" dur={dur}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 90px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker label="L'acquisition" delay={4} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={620} height={310} viewBox="0 0 310 190" style={{ overflow: "visible" }}>
            <line x1={10} y1={178} x2={300} y2={178} stroke={COLORS.paperEdge} strokeWidth={1.5} />
            <line x1={10} y1={10} x2={10} y2={178} stroke={COLORS.paperEdge} strokeWidth={1.5} />

            <polyline points={cost} fill="none" stroke={COLORS.anthracite} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} opacity={0.8} />
            <polyline points={demand} fill="none" stroke={COLORS.blue} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} style={{ filter: `drop-shadow(0 0 8px ${COLORS.blue}66)` }} />

            <circle cx={300} cy={26} r={5} fill={COLORS.blue} opacity={progress} />
            <circle cx={300} cy={168} r={4.5} fill={COLORS.anthracite} opacity={progress * 0.8} />
          </svg>
        </div>

        <Headline delay={140} size={68} style={{ textAlign: "center" }}>
          <span style={{ color: COLORS.blue }}>+ de demandes</span> · − de coûts
        </Headline>
      </div>
    </Bg>
  );
};
