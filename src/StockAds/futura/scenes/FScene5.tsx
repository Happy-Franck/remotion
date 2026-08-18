import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { HexChevron } from "../../components/HexChevron";
import { NEON, glow } from "../neon";
import { FHeadline, FKicker, FScene } from "../FKit";
import { NeonMap } from "../NeonMap";

// Scene 5 — Passer à l'échelle. The network expands (France → Europe).
export const FScene5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [10, 155], [6, 49], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const pulse = Math.abs(Math.sin(frame * 0.16));

  return (
    <FScene dur={dur}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <FKicker label="Passer à l'échelle" />
        <RiseIn delay={8}>
          <div style={{ fontFamily: "monospace", fontSize: 24, color: NEON.muted }}>
            FRANCE <span style={{ color: NEON.cyan }}>→</span> EUROPE
          </div>
        </RiseIn>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RiseIn delay={12}>
          <NeonMap size={660} active={active} pulse={pulse} />
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
        <RiseIn delay={124} y={24}>
          <FHeadline>
            Passez <span style={{ color: NEON.cyan }}>à l'échelle</span>
          </FHeadline>
        </RiseIn>
      </div>
    </FScene>
  );
};
