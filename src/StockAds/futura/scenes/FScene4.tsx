import { interpolate, useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT } from "../../theme";
import { NEON } from "../neon";
import { FKicker, FScene } from "../FKit";
import { NeonMap } from "../NeonMap";

// Scene 4 — À chaque échelle. One node grows into a territory.
const WORDS = ["Indépendant", "Franchisé", "Réseau"];

export const FScene4: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.round(
    interpolate(frame, [16, 150], [1, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const pulse = Math.abs(Math.sin(frame * 0.16));

  return (
    <FScene dur={dur}>
      <FKicker label="À chaque échelle" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RiseIn delay={12}>
          <NeonMap size={640} active={active} pulse={pulse} />
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
    </FScene>
  );
};
