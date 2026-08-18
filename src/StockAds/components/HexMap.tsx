import { COLORS } from "../theme";

// A hexagonal territory grid (nods to the logo's hexagon). Hexes activate
// outward from a focal region — used to show the network expanding
// (zone de chalandise → France → Europe). `active` = how many hexes are lit.
const COLS = 7;
const ROWS = 7;
const R = 30; // hex radius

const SQRT3 = Math.sqrt(3);

type Hex = { cx: number; cy: number; d: number };

const buildHexes = (): { hexes: Hex[]; w: number; h: number } => {
  const raw: Hex[] = [];
  // Focal point ≈ where the first centre sits ("France").
  const focalC = 2;
  const focalRow = 3;
  const fx = R * SQRT3 * (focalC + 0.5 * (focalRow & 1));
  const fy = R * 1.5 * focalRow;

  for (let row = 0; row < ROWS; row++) {
    for (let c = 0; c < COLS; c++) {
      const cx = R * SQRT3 * (c + 0.5 * (row & 1));
      const cy = R * 1.5 * row;
      const d = Math.hypot(cx - fx, cy - fy);
      raw.push({ cx, cy, d });
    }
  }
  raw.sort((a, b) => a.d - b.d);
  const w = R * SQRT3 * (COLS + 0.5) + R;
  const h = R * 1.5 * (ROWS - 1) + R * 2;
  return { hexes: raw, w, h };
};

const hexPath = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
};

const { hexes, w: VB_W, h: VB_H } = buildHexes();

export const HexMap: React.FC<{
  size?: number;
  active?: number;
  onDark?: boolean;
}> = ({ size = 620, active = 0, onDark = false }) => {
  const idle = onDark ? "rgba(255,255,255,0.10)" : "rgba(53,52,52,0.10)";
  const idleStroke = onDark ? "rgba(255,255,255,0.16)" : "rgba(53,52,52,0.14)";

  return (
    <svg width={size} height={(size * VB_H) / VB_W} viewBox={`0 0 ${VB_W} ${VB_H}`}>
      {hexes.map((hx, i) => {
        const on = i < active;
        return (
          <g key={i}>
            <polygon
              points={hexPath(hx.cx, hx.cy, R - 3)}
              fill={on ? "rgba(3,105,234,0.16)" : idle}
              stroke={on ? COLORS.blue : idleStroke}
              strokeWidth={on ? 2.5 : 1.5}
            />
            {on ? <circle cx={hx.cx} cy={hx.cy} r={5.5} fill={COLORS.blue} /> : null}
          </g>
        );
      })}
    </svg>
  );
};
