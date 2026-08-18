import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Bg, Headline, Kicker, RiseIn } from "../components/SceneKit";
import { COLORS, FONT } from "../theme";

type P = { x: number; y: number };
const qbez = (a: P, c: P, b: P, t: number): P => {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
};

// Scene 2 — La solution (0:07–0:13). Targeted audiences flow toward the centre.
// On-screen text: "Acquisition client".
export const Scene2Solution: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const hub: P = { x: 450, y: 430 };
  const srcA: P = { x: 150, y: 165 };
  const srcB: P = { x: 750, y: 165 };
  const ctrlA: P = { x: 250, y: 400 };
  const ctrlB: P = { x: 650, y: 400 };

  const flow = (a: P, c: P, count: number, appear: boolean) =>
    new Array(count).fill(0).map((_, i) => {
      const t = ((frame / 46 + i / count) % 1 + 1) % 1;
      const p = qbez(a, c, hub, t);
      return (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={7}
          fill={COLORS.blueSoft}
          opacity={appear ? (1 - t) * 0.9 + 0.1 : 0}
        />
      );
    });

  const paths = frame > 20;

  return (
    <Bg variant="dark" dur={dur}>
      <AbsoluteFill
        style={{
          padding: "104px 80px 344px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Kicker label="La solution" onDark delay={4} />

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <svg width={760} height={620} viewBox="0 0 900 620">
            {/* connectors */}
            {paths ? (
              <>
                <path
                  d={`M${srcA.x} ${srcA.y} Q${ctrlA.x} ${ctrlA.y} ${hub.x} ${hub.y}`}
                  fill="none"
                  stroke="rgba(59,139,240,0.35)"
                  strokeWidth={3}
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                />
                <path
                  d={`M${srcB.x} ${srcB.y} Q${ctrlB.x} ${ctrlB.y} ${hub.x} ${hub.y}`}
                  fill="none"
                  stroke="rgba(59,139,240,0.35)"
                  strokeWidth={3}
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                />
                {flow(srcA, ctrlA, 4, true)}
                {flow(srcB, ctrlB, 4, true)}
              </>
            ) : null}

            {/* audience chips */}
            {[
              { p: srcA, l1: "Particuliers", l2: "déménagement" },
              { p: srcB, l1: "Entreprises", l2: "BTP" },
            ].map((s, i) => (
              <g key={i} opacity={paths ? 1 : 0}>
                <rect
                  x={s.p.x - 130}
                  y={s.p.y - 46}
                  width={260}
                  height={92}
                  rx={18}
                  fill="#2B2A2A"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth={2}
                />
                <circle cx={s.p.x - 96} cy={s.p.y} r={16} fill={COLORS.blue} />
                <text x={s.p.x - 62} y={s.p.y - 6} fill="#fff" style={{ font: `600 26px ${FONT}` }}>
                  {s.l1}
                </text>
                <text x={s.p.x - 62} y={s.p.y + 24} fill="rgba(255,255,255,0.6)" style={{ font: `500 22px ${FONT}` }}>
                  {s.l2}
                </text>
              </g>
            ))}

            {/* central hub (brand hexagon + centre) */}
            <g>
              <polygon
                points={`${hub.x - 66},${hub.y - 38} ${hub.x + 66},${hub.y - 38} ${hub.x + 100},${hub.y + 20} ${hub.x + 66},${hub.y + 78} ${hub.x - 66},${hub.y + 78} ${hub.x - 100},${hub.y + 20}`}
                fill="rgba(3,105,234,0.16)"
                stroke={COLORS.blue}
                strokeWidth={4}
              />
              <rect x={hub.x - 48} y={hub.y - 18} width={96} height={70} rx={8} fill={COLORS.blue} />
              {[0, 1, 2].map((r) => (
                <line
                  key={r}
                  x1={hub.x - 40}
                  x2={hub.x + 40}
                  y1={hub.y + r * 16}
                  y2={hub.y + r * 16}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth={2.5}
                />
              ))}
            </g>
          </svg>
        </div>

        <RiseIn delay={70} y={20}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 30,
              color: COLORS.mutedOnDark,
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            STOCKADS prend en charge votre stratégie
          </div>
        </RiseIn>
        <Headline onDark delay={78} size={80} style={{ textAlign: "center" }}>
          Acquisition <span style={{ color: COLORS.blueSoft }}>client</span>
        </Headline>
      </AbsoluteFill>
    </Bg>
  );
};
