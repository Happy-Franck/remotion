import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT } from "../../theme";
import { NetworkMap } from "../NetworkMap";
import { PKicker, PScene } from "../PKit";
import { NEON } from "../theme";

// Scene 4 — À chaque échelle. One node grows into a territory.
const WORDS = ["Indépendant", "Franchisé", "Réseau"];

export const PScene4: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [16, 150], [1, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <PScene dur={dur}>
      <PKicker label="À chaque échelle" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RiseIn delay={12}>
          <NetworkMap size={640} active={active} />
        </RiseIn>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center", fontFamily: FONT, fontWeight: 700, fontSize: 58 }}>
        {WORDS.map((w, i) => {
          const lit = frame > 70 + i * 26;
          return (
            <RiseIn key={w} delay={70 + i * 26} y={20} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: lit ? NEON.cyan : NEON.white, textShadow: lit ? `0 0 18px ${NEON.cyan}` : "none" }}>{w}</span>
              {i < WORDS.length - 1 ? <span style={{ color: NEON.muted }}>·</span> : null}
            </RiseIn>
          );
        })}
      </div>
    </PScene>
  );
};
