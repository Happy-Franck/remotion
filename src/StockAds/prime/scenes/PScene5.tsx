import { interpolate, useCurrentFrame } from "remotion";
import { HexChevron } from "../../components/HexChevron";
import { RiseIn } from "../../components/SceneKit";
import { NetworkMap } from "../NetworkMap";
import { PHeadline, PKicker, PScene } from "../PKit";
import { FONT_MONO, glow, NEON } from "../theme";

// Scene 5 — Passer à l'échelle. The network expands (France → Europe).
export const PScene5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [10, 155], [6, 49], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <PScene dur={dur}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <PKicker label="Passer à l'échelle" />
        <RiseIn delay={8}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: NEON.muted }}>
            FRANCE <span style={{ color: NEON.cyan }}>→</span> EUROPE
          </div>
        </RiseIn>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RiseIn delay={12}>
          <NetworkMap size={660} active={active} />
        </RiseIn>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <RiseIn delay={120} y={10}>
          <div style={{ filter: glow(NEON.cyan, 16) }}>
            <HexChevron
              size={92}
              double
              outline={NEON.blueGlow}
              chevron={NEON.cyan}
              progress={interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          </div>
        </RiseIn>
        <PHeadline delay={124} style={{ textAlign: "left" }} accent={(w) => w.toLowerCase().includes("échelle")}>
          Passez à l'échelle
        </PHeadline>
      </div>
    </PScene>
  );
};
