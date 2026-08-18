import { useCurrentFrame } from "remotion";
import { roundedPolygonPath } from "../../prime/geom";
import { GHeadline, GKicker, GReveal, GScene } from "../GKit";
import { FONT, GLASS } from "../theme";

type P = { x: number; y: number };
const qbez = (a: P, c: P, b: P, t: number): P => {
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
};

const hubHex = (cx: number, cy: number, r: number) =>
  new Array(6).fill(0).map((_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

// Scene 2 — La solution. Prospect streams converge on a glass hub.
export const GScene2: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const hub: P = { x: 450, y: 430 };
  const srcA: P = { x: 150, y: 165 };
  const srcB: P = { x: 750, y: 165 };
  const ctrlA: P = { x: 250, y: 400 };
  const ctrlB: P = { x: 650, y: 400 };
  const on = frame > 20;
  const pulse = Math.abs(Math.sin(frame * 0.08));

  const flow = (a: P, c: P) =>
    new Array(5).fill(0).map((_, i) => {
      const t = (((frame / 42 + i / 5) % 1) + 1) % 1;
      const p = qbez(a, c, hub, t);
      return <circle key={i} cx={p.x} cy={p.y} r={6} fill={GLASS.cyan} opacity={(1 - t) * 0.85 + 0.1} />;
    });

  return (
    <GScene dur={dur}>
      <GKicker label="La solution" />
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <svg width={760} height={600} viewBox="0 0 900 600" style={{ overflow: "visible", filter: "drop-shadow(0 18px 36px rgba(20,50,100,0.14))" }}>
          {on ? (
            <>
              <path d={`M${srcA.x} ${srcA.y} Q${ctrlA.x} ${ctrlA.y} ${hub.x} ${hub.y}`} fill="none" stroke="rgba(3,105,234,0.25)" strokeWidth={2} strokeDasharray="2 12" strokeLinecap="round" />
              <path d={`M${srcB.x} ${srcB.y} Q${ctrlB.x} ${ctrlB.y} ${hub.x} ${hub.y}`} fill="none" stroke="rgba(3,105,234,0.25)" strokeWidth={2} strokeDasharray="2 12" strokeLinecap="round" />
              {flow(srcA, ctrlA)}
              {flow(srcB, ctrlB)}
            </>
          ) : null}

          {[
            { p: srcA, l1: "Particuliers", l2: "déménagement" },
            { p: srcB, l1: "Entreprises", l2: "BTP" },
          ].map((s, i) => (
            <g key={i} opacity={on ? 1 : 0}>
              <path d={roundedPolygonPath([
                { x: s.p.x - 130, y: s.p.y - 44 }, { x: s.p.x + 130, y: s.p.y - 44 },
                { x: s.p.x + 130, y: s.p.y + 44 }, { x: s.p.x - 130, y: s.p.y + 44 },
              ], 16)} fill="rgba(255,255,255,0.62)" stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} />
              <circle cx={s.p.x - 96} cy={s.p.y} r={14} fill={GLASS.blue} />
              <text x={s.p.x - 66} y={s.p.y - 6} fill={GLASS.ink} style={{ font: `600 24px ${FONT}` }}>{s.l1}</text>
              <text x={s.p.x - 66} y={s.p.y + 22} fill={GLASS.inkSoft} style={{ font: `400 20px ${FONT}` }}>{s.l2}</text>
            </g>
          ))}

          <path d={roundedPolygonPath(hubHex(hub.x, hub.y, 74 + pulse * 4), 12)} fill="rgba(255,255,255,0.5)" stroke={GLASS.blue} strokeWidth={2.5} />
          <path d={roundedPolygonPath(hubHex(hub.x, hub.y, 44), 8)} fill={GLASS.blue} opacity={0.88} />
          <circle cx={hub.x} cy={hub.y} r={10} fill="#fff" />
        </svg>
      </div>

      <GReveal delay={72} y={16}>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 28, color: GLASS.inkSoft, textAlign: "center", marginBottom: 12 }}>
          STOCKADS pilote votre stratégie
        </div>
      </GReveal>
      <GHeadline delay={80} style={{ textAlign: "center" }} accent={(w) => w.toLowerCase().startsWith("client")}>
        Acquisition client
      </GHeadline>
    </GScene>
  );
};
