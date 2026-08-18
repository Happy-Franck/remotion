import { useCurrentFrame } from "remotion";
import { rand } from "../futura/neon";
import { roundedPolygonPath } from "./geom";
import { glow, NEON } from "./theme";

// Glowing hex network with three refinements over the original: rounded node
// shells, a soft ripple ring on the most-recently-activated node, and a
// comet-light that travels the active chain — reads as live data flowing
// through the network rather than a static diagram.
const COLS = 7;
const ROWS = 7;
const R = 30;
const SQRT3 = Math.sqrt(3);

type Node = { cx: number; cy: number; d: number };

const build = () => {
  const nodes: Node[] = [];
  const focalC = 2;
  const focalRow = 3;
  const fx = R * SQRT3 * (focalC + 0.5 * (focalRow & 1));
  const fy = R * 1.5 * focalRow;
  for (let row = 0; row < ROWS; row++) {
    for (let c = 0; c < COLS; c++) {
      const cx = R * SQRT3 * (c + 0.5 * (row & 1));
      const cy = R * 1.5 * row;
      nodes.push({ cx, cy, d: Math.hypot(cx - fx, cy - fy) });
    }
  }
  nodes.sort((a, b) => a.d - b.d);
  const edges: [number, number][] = [];
  const link = R * SQRT3 * 1.05;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.hypot(nodes[i].cx - nodes[j].cx, nodes[i].cy - nodes[j].cy) < link) {
        edges.push([i, j]);
      }
    }
  }
  const w = R * SQRT3 * (COLS + 0.5) + R;
  const h = R * 1.5 * (ROWS - 1) + R * 2;
  return { nodes, edges, w, h };
};

const hexPts = (cx: number, cy: number, r: number) =>
  new Array(6).fill(0).map((_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

const { nodes, edges, w: VB_W, h: VB_H } = build();

// Comet path: walk the activated nodes in activation order, connecting
// consecutive ones — gives a continuous polyline that grows as the network does.
const buildComet = (active: number) => {
  const pts = nodes.slice(0, Math.max(2, active));
  const seg: { a: Node; b: Node; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(a.cx - b.cx, a.cy - b.cy);
    seg.push({ a, b, len });
    total += len;
  }
  return { seg, total };
};

export const NetworkMap: React.FC<{ size?: number; active?: number }> = ({ size = 640, active = 0 }) => {
  const frame = useCurrentFrame();
  const rippleIdx = Math.max(0, active - 1);
  const rippleT = ((frame % 46) + 46) % 46 / 46;

  const { seg, total } = buildComet(active);
  const cometT = (((frame * 2.2) % (total || 1)) + (total || 1)) % (total || 1);
  let acc = 0;
  let cometPt = nodes[0];
  for (const s of seg) {
    if (cometT >= acc && cometT <= acc + s.len) {
      const local = s.len === 0 ? 0 : (cometT - acc) / s.len;
      cometPt = { cx: s.a.cx + (s.b.cx - s.a.cx) * local, cy: s.a.cy + (s.b.cy - s.a.cy) * local, d: 0 };
      break;
    }
    acc += s.len;
  }

  return (
    <svg width={size} height={(size * VB_H) / VB_W} viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ filter: glow(NEON.blue, 10), overflow: "visible" }}>
      <defs>
        <radialGradient id="cometGlow">
          <stop offset="0%" stopColor={NEON.white} stopOpacity={1} />
          <stop offset="40%" stopColor={NEON.cyan} stopOpacity={0.8} />
          <stop offset="100%" stopColor={NEON.cyan} stopOpacity={0} />
        </radialGradient>
      </defs>

      {edges.map(([i, j], k) => {
        const on = i < active && j < active;
        return (
          <line
            key={k}
            x1={nodes[i].cx}
            y1={nodes[i].cy}
            x2={nodes[j].cx}
            y2={nodes[j].cy}
            stroke={on ? NEON.blueGlow : "rgba(58,160,255,0.06)"}
            strokeWidth={on ? 1.6 : 1}
          />
        );
      })}

      {/* comet travelling the activated chain */}
      {active > 1 ? <circle cx={cometPt.cx} cy={cometPt.cy} r={9} fill="url(#cometGlow)" /> : null}

      {nodes.map((n, i) => {
        const on = i < active;
        const isRipple = i === rippleIdx && on;
        return (
          <g key={i}>
            {isRipple ? (
              <polygon
                points={hexPts(n.cx, n.cy, (R - 4) * (1 + rippleT * 0.9)).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
                fill="none"
                stroke={NEON.cyan}
                strokeWidth={1.4}
                opacity={(1 - rippleT) * 0.7}
              />
            ) : null}
            <path
              d={roundedPolygonPath(hexPts(n.cx, n.cy, R - 4), 3)}
              fill={on ? "rgba(58,160,255,0.14)" : "rgba(58,160,255,0.03)"}
              stroke={on ? NEON.blue : "rgba(58,160,255,0.12)"}
              strokeWidth={on ? 2 : 1}
            />
            {on ? <circle cx={n.cx} cy={n.cy} r={4 + rand(i, 3) * 1.5} fill={NEON.cyan} opacity={0.9} /> : null}
          </g>
        );
      })}
    </svg>
  );
};
