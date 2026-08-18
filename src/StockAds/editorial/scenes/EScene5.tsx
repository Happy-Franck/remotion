import { interpolate, useCurrentFrame } from "remotion";
import { HexChevron } from "../../components/HexChevron";
import { Bg, Headline, Kicker, RiseIn } from "../../components/SceneKit";
import { rand } from "../../futura/neon";
import { COLORS } from "../../theme";

// Scene 5 — Passer à l'échelle (0:27–0:34). Brief visual: centres fill up and
// the map expands progressively with new centres appearing. On-screen text
// (verbatim): "Passez à l'échelle".
const CENTRES = 14;

export const EScene5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const appeared = Math.round(
    interpolate(frame, [10, 130], [3, CENTRES], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <Bg variant="light" dur={dur}>
      <div style={{ position: "absolute", inset: 0, padding: "150px 90px 340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker label="Passer à l'échelle" delay={4} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={460} height={460} viewBox="0 0 460 460">
            {new Array(CENTRES).fill(0).map((_, i) => {
              const angle = rand(i, 11) * Math.PI * 2;
              const dist = 40 + rand(i, 12) * 180;
              const x = 230 + Math.cos(angle) * dist;
              const y = 230 + Math.sin(angle) * dist;
              const on = i < appeared;
              const fillP = interpolate(frame, [10 + i * 6, 60 + i * 6], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <g key={i} opacity={on ? 1 : 0}>
                  <circle cx={x} cy={y} r={14} fill="none" stroke={COLORS.paperEdge} strokeWidth={2} />
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill="none"
                    stroke={COLORS.blue}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray={100}
                    strokeDashoffset={100 - fillP * 100}
                    transform={`rotate(-90 ${x} ${y})`}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <RiseIn delay={130} y={10}>
            <HexChevron
              size={90}
              double
              outline={COLORS.anthracite}
              chevron={COLORS.blue}
              progress={interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          </RiseIn>
          <Headline delay={134} size={78}>
            Passez <span style={{ color: COLORS.blue }}>à l'échelle</span>
          </Headline>
        </div>
      </div>
    </Bg>
  );
};
