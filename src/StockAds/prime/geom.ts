type Pt = { x: number; y: number };

const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y });
const norm = (a: Pt): Pt => {
  const len = Math.hypot(a.x, a.y) || 1;
  return { x: a.x / len, y: a.y / len };
};
const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (a: Pt, s: number): Pt => ({ x: a.x * s, y: a.y * s });

// Builds an SVG path for a polygon with rounded corners: each vertex is cut
// back by `radius` along both adjacent edges and joined with a quadratic
// curve using the original vertex as control point.
export const roundedPolygonPath = (points: Pt[], radius: number): string => {
  const n = points.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];
    const toPrev = norm(sub(prev, curr));
    const toNext = norm(sub(next, curr));
    const p1 = add(curr, scale(toPrev, radius));
    const p2 = add(curr, scale(toNext, radius));
    d += i === 0 ? `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} ` : `L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `;
    d += `Q ${curr.x.toFixed(2)} ${curr.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return `${d}Z`;
};
