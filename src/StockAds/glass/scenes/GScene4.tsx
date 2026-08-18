import { interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../../theme";
import { GlassMap } from "../GlassMap";
import { GKicker, GReveal, GScene } from "../GKit";
import { GLASS } from "../theme";

const WORDS = ["Indépendant", "Franchisé", "Réseau"];

// Scene 4 — À chaque échelle. One node grows into a territory.
export const GScene4: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [16, 150], [1, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <GScene dur={dur}>
      <GKicker label="À chaque échelle" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <GReveal delay={12}>
          <GlassMap size={640} active={active} />
        </GReveal>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center", fontFamily: FONT, fontWeight: 700, fontSize: 58 }}>
        {WORDS.map((w, i) => {
          const lit = frame > 70 + i * 26;
          return (
            <GReveal key={w} delay={70 + i * 26} y={20} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: lit ? GLASS.blue : GLASS.ink }}>{w}</span>
              {i < WORDS.length - 1 ? <span style={{ color: GLASS.inkSoft }}>·</span> : null}
            </GReveal>
          );
        })}
      </div>
    </GScene>
  );
};
