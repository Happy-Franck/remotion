import { useCurrentFrame } from "remotion";
import { RiseIn } from "../../components/SceneKit";
import { FONT_MONO, NEON, glow } from "../neon";
import { FHeadline, FKicker, FScene } from "../FKit";

type P = { x: number; y: number };
const qbez = (a: P, c: P, b: P, t: number): P => {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
};

// Scene 2 — La solution. Prospect streams converge on the central node.
export const FScene2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const hub: P = { x: 450, y: 430 };
  const srcA: P = { x: 150, y: 165 };
  const srcB: P = { x: 750, y: 165 };
  const ctrlA: P = { x: 250, y: 400 };
  const ctrlB: P = { x: 650, y: 400 };
  const on = frame > 20;

  const flow = (a: P, c: P) =>
    new Array(5).fill(0).map((_, i) => {
      const t = (((frame / 42 + i / 5) % 1) + 1) % 1;
      const p = qbez(a, c, hub, t);
      return <circle key={i} cx={p.x} cy={p.y} r={6} fill={NEON.cyan} opacity={(1 - t) * 0.9 + 0.1} />;
    });

  return (
    <FScene dur={dur}>
      <FKicker label="La solution" />
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <svg width={760} height={600} viewBox="0 0 900 600" style={{ filter: glow(NEON.blue, 8), overflow: "visible" }}>
          {on ? (
            <>
              <path d={`M${srcA.x} ${srcA.y} Q${ctrlA.x} ${ctrlA.y} ${hub.x} ${hub.y}`} fill="none" stroke="rgba(70,228,255,0.3)" strokeWidth={2} strokeDasharray="2 12" strokeLinecap="round" />
              <path d={`M${srcB.x} ${srcB.y} Q${ctrlB.x} ${ctrlB.y} ${hub.x} ${hub.y}`} fill="none" stroke="rgba(70,228,255,0.3)" strokeWidth={2} strokeDasharray="2 12" strokeLinecap="round" />
              {flow(srcA, ctrlA)}
              {flow(srcB, ctrlB)}
            </>
          ) : null}

          {[
            { p: srcA, l1: "PARTICULIERS", l2: "déménagement" },
            { p: srcB, l1: "ENTREPRISES", l2: "BTP" },
          ].map((s, i) => (
            <g key={i} opacity={on ? 1 : 0}>
              <rect x={s.p.x - 130} y={s.p.y - 44} width={260} height={88} rx={14} fill="rgba(10,20,45,0.75)" stroke={NEON.line} strokeWidth={1.5} />
              <circle cx={s.p.x - 96} cy={s.p.y} r={14} fill={NEON.cyan} />
              <text x={s.p.x - 66} y={s.p.y - 6} fill={NEON.white} style={{ font: `600 24px ${FONT_MONO}` }}>{s.l1}</text>
              <text x={s.p.x - 66} y={s.p.y + 22} fill={NEON.muted} style={{ font: `400 20px ${FONT_MONO}` }}>{s.l2}</text>
            </g>
          ))}

          {/* central node */}
          <polygon points={`${hub.x},${hub.y - 74} ${hub.x + 64},${hub.y - 37} ${hub.x + 64},${hub.y + 37} ${hub.x},${hub.y + 74} ${hub.x - 64},${hub.y + 37} ${hub.x - 64},${hub.y - 37}`} fill="rgba(3,105,234,0.18)" stroke={NEON.blueGlow} strokeWidth={3} />
          <polygon points={`${hub.x},${hub.y - 44} ${hub.x + 38},${hub.y - 22} ${hub.x + 38},${hub.y + 22} ${hub.x},${hub.y + 44} ${hub.x - 38},${hub.y + 22} ${hub.x - 38},${hub.y - 22}`} fill={NEON.blue} opacity={0.9} />
          <circle cx={hub.x} cy={hub.y} r={10} fill={NEON.white} />
        </svg>
      </div>

      <RiseIn delay={72} y={16}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: NEON.muted, textAlign: "center", marginBottom: 12 }}>
          STOCKADS ▸ pilote votre stratégie
        </div>
      </RiseIn>
      <RiseIn delay={80} y={24}>
        <FHeadline style={{ textAlign: "center" }}>
          Acquisition <span style={{ color: NEON.cyan }}>client</span>
        </FHeadline>
      </RiseIn>
    </FScene>
  );
};
