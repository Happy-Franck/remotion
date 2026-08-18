import { interpolate, useCurrentFrame } from "remotion";
import { HexChevron } from "../../components/HexChevron";
import { GlassMap } from "../GlassMap";
import { GHeadline, GKicker, GReveal, GScene } from "../GKit";
import { FONT, GLASS } from "../theme";

// Scene 5 — Passer à l'échelle. The network expands (France → Europe).
export const GScene5: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [10, 155], [6, 49], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <GScene dur={dur}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <GKicker label="Passer à l'échelle" />
        <GReveal delay={8}>
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 24, color: GLASS.inkSoft }}>
            France <span style={{ color: GLASS.blue }}>→</span> Europe
          </div>
        </GReveal>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <GReveal delay={12}>
          <GlassMap size={660} active={active} />
        </GReveal>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <GReveal delay={120} y={10}>
          <div style={{ filter: "drop-shadow(0 10px 22px rgba(3,105,234,0.28))" }}>
            <HexChevron
              size={92}
              double
              outline={GLASS.blue}
              chevron={GLASS.cyan}
              progress={interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          </div>
        </GReveal>
        <GHeadline delay={124} style={{ textAlign: "left" }} accent={(w) => w.toLowerCase().includes("échelle")}>
          Passez à l'échelle
        </GHeadline>
      </div>
    </GScene>
  );
};
