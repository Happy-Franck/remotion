import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HexChevron } from "../components/HexChevron";
import { HexMap } from "../components/HexMap";
import { Bg, Headline, Kicker, RiseIn } from "../components/SceneKit";
import { COLORS, FONT } from "../theme";

// Scene 5 — Passer à l'échelle (0:27–0:34). Centres fill and the map expands.
// On-screen text: "Passez à l'échelle".
export const Scene5Growth: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [10, 155], [6, 49], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
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
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <Kicker label="Passer à l'échelle" delay={4} />
          <RiseIn delay={8}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT, fontWeight: 600, fontSize: 26, color: COLORS.mutedOnLight }}>
              France <span style={{ color: COLORS.blue }}>→</span> Europe
            </div>
          </RiseIn>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <RiseIn delay={12}>
            <HexMap size={660} active={active} />
          </RiseIn>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <RiseIn delay={120} y={10}>
            <HexChevron size={92} double progress={interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          </RiseIn>
          <Headline delay={124} size={78} style={{ textAlign: "left" }}>
            Passez <span style={{ color: COLORS.blue }}>à l'échelle</span>
          </Headline>
        </div>
      </AbsoluteFill>
    </Bg>
  );
};
