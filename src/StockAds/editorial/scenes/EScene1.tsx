import { interpolate, useCurrentFrame } from "remotion";
import { Bg, Headline, Kicker } from "../../components/SceneKit";
import { COLORS } from "../../theme";
import { Ring } from "../Ring";

// Scene 1 — Le problème (0:00–0:07). Brief visual: a centre with available
// boxes fills up, then a network of several centres appears. On-screen text
// (verbatim, brief §4): "Augmenter vos locations".
export const EScene1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();

  // Beat A (0–100): one ring fills from "available" to "nearly full".
  const fillProgress = interpolate(frame, [10, 100], [0.12, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const beatAOpacity = interpolate(frame, [86, 104], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Beat B (100–end): the single centre becomes a small network of centres.
  const beatBOpacity = interpolate(frame, [96, 116], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const networkGrow = interpolate(frame, [96, 130], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Bg variant="light" dur={dur}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 90px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker label="Le problème" delay={4} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 340, height: 340 }}>
            <div style={{ position: "absolute", inset: 0, opacity: beatAOpacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ring size={300} progress={fillProgress} color={COLORS.blue} trackColor={COLORS.paperEdge} strokeWidth={4}>
                <svg width={70} height={70} viewBox="0 0 70 70" style={{ position: "absolute" }}>
                  <rect x={10} y={26} width={50} height={34} rx={3} fill="none" stroke={COLORS.anthracite} strokeWidth={2.5} />
                  <path d="M6 26 L35 10 L64 26" fill="none" stroke={COLORS.anthracite} strokeWidth={2.5} strokeLinejoin="round" />
                </svg>
              </Ring>
            </div>

            <div style={{ position: "absolute", inset: 0, opacity: beatBOpacity, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, scale: String(networkGrow) }}>
              {[0, 1, 2].map((i) => (
                <Ring key={i} size={i === 1 ? 128 : 96} progress={1} color={COLORS.blue} strokeWidth={3} glow={10} />
              ))}
            </div>
          </div>
        </div>

        <Headline delay={132} size={78} style={{ textAlign: "center" }}>
          Augmenter vos <span style={{ color: COLORS.blue }}>locations</span>
        </Headline>
      </div>
    </Bg>
  );
};
