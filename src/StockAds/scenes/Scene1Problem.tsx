import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { StorageCenter } from "../components/StorageCenter";
import { Bg, Headline, Kicker, RiseIn } from "../components/SceneKit";
import { COLORS } from "../theme";

// Scene 1 — Le problème (0:00–0:07). Boxes fill, then a network appears.
// On-screen text: "Augmenter vos locations".
export const Scene1Problem: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const occupied = Math.round(
    interpolate(frame, [14, 74], [1, 5], {
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
        <Kicker label="Le problème" delay={4} />

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 34,
          }}
        >
          <RiseIn delay={10}>
            <StorageCenter size={300} occupied={occupied} />
          </RiseIn>
          <RiseIn delay={104} y={40}>
            <StorageCenter size={240} occupied={5} />
          </RiseIn>
          <RiseIn delay={132} y={40}>
            <StorageCenter size={240} occupied={5} />
          </RiseIn>
        </div>

        <Headline delay={92} size={78} style={{ textAlign: "center" }}>
          Augmenter vos{" "}
          <span style={{ color: COLORS.blue }}>locations</span>
        </Headline>
      </AbsoluteFill>
    </Bg>
  );
};
