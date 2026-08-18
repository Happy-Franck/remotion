import { FONT_MONO, glow, NEON } from "./theme";

// Holographic chart: demand rises (cyan) while acquisition cost falls (blue),
// each line led by a bright comet head instead of a plain dot, with a
// lightly animated grid for depth.
const demands = "40,196 120,180 200,146 280,98 350,66 400,44";
const cost = "40,60 120,80 200,120 280,152 350,182 400,202";

export const Chart: React.FC<{ size?: number; progress?: number }> = ({ size = 640, progress = 1 }) => {
  const off = 100 - progress * 100;
  const p = Math.min(1, progress);
  // Head position along the demand curve (approx, piecewise-linear on the polyline).
  const pts = demands.split(" ").map((s) => s.split(",").map(Number));
  const idxF = p * (pts.length - 1);
  const i0 = Math.min(pts.length - 2, Math.floor(idxF));
  const lt = idxF - i0;
  const hx = pts[i0][0] + (pts[i0 + 1][0] - pts[i0][0]) * lt;
  const hy = pts[i0][1] + (pts[i0 + 1][1] - pts[i0][1]) * lt;

  return (
    <svg width={size} height={(size * 260) / 440} viewBox="0 0 440 260" style={{ filter: glow(NEON.blue, 8), overflow: "visible" }}>
      <defs>
        <radialGradient id="chartComet">
          <stop offset="0%" stopColor={NEON.white} stopOpacity={1} />
          <stop offset="45%" stopColor={NEON.cyan} stopOpacity={0.85} />
          <stop offset="100%" stopColor={NEON.cyan} stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect x={14} y={10} width={412} height={228} rx={12} fill="rgba(10,20,45,0.5)" stroke={NEON.line} strokeWidth={1.5} />
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1={40} y1={y} x2={410} y2={y} stroke="rgba(58,160,255,0.08)" strokeWidth={1} />
      ))}
      {[100, 160, 220, 280, 340, 400].map((x) => (
        <line key={x} x1={x} y1={16} x2={x} y2={224} stroke="rgba(58,160,255,0.05)" strokeWidth={1} />
      ))}
      <line x1={40} y1={16} x2={40} y2={224} stroke={NEON.line} strokeWidth={1.5} />
      <line x1={40} y1={224} x2={410} y2={224} stroke={NEON.line} strokeWidth={1.5} />

      <polygon points={`40,224 ${demands} 400,224`} fill="rgba(70,228,255,0.10)" opacity={Math.max(0, (progress - 0.2) / 0.8)} />

      <polyline points={cost} fill="none" stroke={NEON.blue} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} />
      <polyline points={demands} fill="none" stroke={NEON.cyan} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} />

      {p > 0 && p < 1 ? <circle cx={hx} cy={hy} r={16} fill="url(#chartComet)" /> : null}
      <circle cx={400} cy={44} r={7} fill={NEON.cyan} opacity={p} />
      <circle cx={400} cy={202} r={6} fill={NEON.blue} opacity={p} />

      <text x={250} y={36} fill={NEON.cyan} opacity={p} style={{ font: `600 22px ${FONT_MONO}` }}>DEMANDES ▲</text>
      <text x={62} y={214} fill={NEON.blueGlow} opacity={p} style={{ font: `600 20px ${FONT_MONO}` }}>COÛT ACQUISITION ▼</text>
    </svg>
  );
};
