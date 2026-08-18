import { NEON, glow } from "./neon";

// Glowing hex network: nodes light up outward from a focal region and links
// between active neighbours energise — the expanding network (France → Europe).
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
  new Array(6)
    .fill(0)
    .map((_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    })
    .join(" ");

const { nodes, edges, w: VB_W, h: VB_H } = build();

export const NeonMap: React.FC<{ size?: number; active?: number; pulse?: number }> = ({
  size = 640,
  active = 0,
  pulse = 0,
}) => {
  return (
    <svg
      width={size}
      height={(size * VB_H) / VB_W}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={{ filter: glow(NEON.blue, 10), overflow: "visible" }}
    >
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
      {nodes.map((n, i) => {
        const on = i < active;
        return (
          <g key={i}>
            <polygon
              points={hexPts(n.cx, n.cy, R - 4)}
              fill={on ? "rgba(58,160,255,0.14)" : "rgba(58,160,255,0.03)"}
              stroke={on ? NEON.blue : "rgba(58,160,255,0.12)"}
              strokeWidth={on ? 2 : 1}
            />
            {on ? (
              <circle
                cx={n.cx}
                cy={n.cy}
                r={4.5 + (i === active - 1 ? pulse * 6 : 0)}
                fill={NEON.cyan}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};
