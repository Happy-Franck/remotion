import { interpolate, useCurrentFrame } from "remotion";
import { GHeadline, GKicker, GReveal, GScene } from "../GKit";
import { GlassVault } from "../GlassVault";
import { GLASS } from "../theme";

// Scene 1 — Le problème. A vault fills, then a small network of vaults appears.
export const GScene1: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const filled = Math.round(
    interpolate(frame, [14, 80], [0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <GScene dur={dur}>
      <GKicker label="Le problème" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <GReveal delay={10}>
          <GlassVault size={280} filled={filled} />
        </GReveal>
        <GReveal delay={104} y={40}>
          <GlassVault size={220} filled={5} accent={GLASS.cyan} />
        </GReveal>
        <GReveal delay={130} y={40}>
          <GlassVault size={220} filled={5} />
        </GReveal>
      </div>
      <GHeadline delay={92} style={{ textAlign: "center" }} accent={(w) => w.toLowerCase().startsWith("locations")}>
        Augmenter vos locations
      </GHeadline>
    </GScene>
  );
};
