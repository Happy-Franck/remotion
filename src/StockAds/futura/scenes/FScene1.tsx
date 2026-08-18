import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { NEON } from "../neon";
import { FHeadline, FKicker, FScene } from "../FKit";
import { NeonVault } from "../NeonVault";

// Scene 1 — Le problème. A vault fills, then a network of nodes appears.
export const FScene1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const filled = Math.round(
    interpolate(frame, [14, 80], [0, 5], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <FScene dur={dur}>
      <FKicker label="Le problème" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <RiseIn delay={10}>
          <NeonVault size={280} filled={filled} />
        </RiseIn>
        <RiseIn delay={104} y={40}>
          <NeonVault size={220} filled={5} hue={NEON.cyan} />
        </RiseIn>
        <RiseIn delay={130} y={40}>
          <NeonVault size={220} filled={5} />
        </RiseIn>
      </div>
      <RiseIn delay={92} y={24}>
        <FHeadline style={{ textAlign: "center" }}>
          Augmenter vos <span style={{ color: NEON.cyan }}>locations</span>
        </FHeadline>
      </RiseIn>
    </FScene>
  );
};
