import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { PHeadline, PKicker, PScene } from "../PKit";
import { NEON } from "../theme";
import { Vault } from "../Vault";

// Scene 1 — Le problème. A vault fills, then a network of vaults appears.
export const PScene1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const filled = Math.round(
    interpolate(frame, [14, 80], [0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <PScene dur={dur}>
      <PKicker label="Le problème" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <RiseIn delay={10}>
          <Vault size={280} filled={filled} pulseSeed={0} />
        </RiseIn>
        <RiseIn delay={104} y={40}>
          <Vault size={220} filled={5} hue={NEON.cyan} pulseSeed={1} />
        </RiseIn>
        <RiseIn delay={130} y={40}>
          <Vault size={220} filled={5} pulseSeed={2} />
        </RiseIn>
      </div>
      <PHeadline delay={92} style={{ textAlign: "center" }} accent={(w) => w.toLowerCase().startsWith("locations")}>
        Augmenter vos locations
      </PHeadline>
    </PScene>
  );
};
