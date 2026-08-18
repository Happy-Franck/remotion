import { interpolate, useCurrentFrame } from "remotion";
import { Bg, Headline, Kicker, RiseIn } from "../../components/SceneKit";
import { COLORS, FONT } from "../../theme";
import { Ring } from "../Ring";

// Scene 2 — La solution (0:07–0:13). Brief visual: around the centres,
// targeted audiences appear (particuliers en déménagement + entreprises
// BTP). On-screen text (verbatim): "Acquisition client".
export const EScene2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const on = frame > 16;
  const hubProgress = interpolate(frame, [16, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineDash = interpolate(frame, [16, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const Node: React.FC<{ label: string; delay: number }> = ({ label, delay }) => (
    <RiseIn delay={delay} y={14} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ width: 14, height: 14, borderRadius: 7, background: COLORS.blueSoft, boxShadow: `0 0 12px ${COLORS.blueSoft}` }} />
      <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 22, color: COLORS.mutedOnDark }}>{label}</div>
    </RiseIn>
  );

  return (
    <Bg variant="dark" dur={dur}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 90px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker label="La solution" onDark delay={4} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          <div style={{ display: "flex", gap: 160, opacity: on ? 1 : 0 }}>
            <Node label="Particuliers" delay={16} />
            <Node label="Entreprises" delay={22} />
          </div>

          <svg width={260} height={70} viewBox="0 0 260 70" style={{ opacity: on ? 1 : 0 }}>
            <path d="M20 4 Q130 70 130 70" fill="none" stroke={COLORS.blueSoft} strokeWidth={1.5} strokeDasharray={4} opacity={lineDash} />
            <path d="M240 4 Q130 70 130 70" fill="none" stroke={COLORS.blueSoft} strokeWidth={1.5} strokeDasharray={4} opacity={lineDash} />
          </svg>

          <Ring size={140} progress={hubProgress} color={COLORS.blue} trackColor="rgba(255,255,255,0.08)" strokeWidth={3.5} />
        </div>

        <Headline onDark delay={96} size={80} style={{ textAlign: "center" }}>
          Acquisition <span style={{ color: COLORS.blueSoft }}>client</span>
        </Headline>
      </div>
    </Bg>
  );
};
