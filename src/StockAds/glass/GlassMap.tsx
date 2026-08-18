import { roundedPolygonPath } from "../prime/geom";
import { GLASS } from "./theme";

// Frosted hex-tile territory grid: activated tiles glow soft blue instead of
// harsh neon lines — reads as a clean glass dashboard widget.
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
  const w = R * SQRT3 * (COLS + 0.5) + R;
  const h = R * 1.5 * (ROWS - 1) + R * 2;
  return { nodes, w, h };
};

const hexPts = (cx: number, cy: number, r: number) =>
  new Array(6).fill(0).map((_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

const { nodes, w: VB_W, h: VB_H } = build();

export const GlassMap: React.FC<{ size?: number; active?: number }> = ({ size = 620, active = 0 }) => {
  return (
    <svg width={size} height={(size * VB_H) / VB_W} viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ overflow: "visible", filter: "drop-shadow(0 16px 34px rgba(20,50,100,0.16))" }}>
      {nodes.map((n, i) => {
        const on = i < active;
        return (
          <path
            key={i}
            d={roundedPolygonPath(hexPts(n.cx, n.cy, R - 4), 4)}
            fill={on ? "rgba(3,105,234,0.16)" : "rgba(255,255,255,0.4)"}
            stroke={on ? GLASS.blue : "rgba(3,105,234,0.15)"}
            strokeWidth={on ? 2 : 1}
          />
        );
      })}
      {nodes.map((n, i) => (i < active ? <circle key={i} cx={n.cx} cy={n.cy} r={4.5} fill={GLASS.cyan} /> : null))}
    </svg>
  );
};
