import { FONT, GLASS } from "./theme";

// Glass panel data-viz: demand rises (blue), acquisition cost falls
// (anthracite), with a soft glow head on the leading edge.
const demands = "40,196 120,180 200,146 280,98 350,66 400,44";
const cost = "40,60 120,80 200,120 280,152 350,182 400,202";

export const GlassChart: React.FC<{ size?: number; progress?: number }> = ({ size = 640, progress = 1 }) => {
  const off = 100 - progress * 100;
  const p = Math.min(1, progress);

  return (
    <div style={{ filter: "drop-shadow(0 16px 34px rgba(20,50,100,0.16))" }}>
      <svg width={size} height={(size * 260) / 440} viewBox="0 0 440 260">
        <rect x={14} y={10} width={412} height={228} rx={16} fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.8)" strokeWidth={1.5} />
        {[60, 110, 160, 210].map((y) => (
          <line key={y} x1={40} y1={y} x2={410} y2={y} stroke="rgba(3,105,234,0.08)" strokeWidth={1} />
        ))}
        <line x1={40} y1={16} x2={40} y2={224} stroke="rgba(3,105,234,0.2)" strokeWidth={1.5} />
        <line x1={40} y1={224} x2={410} y2={224} stroke="rgba(3,105,234,0.2)" strokeWidth={1.5} />

        <polygon points={`40,224 ${demands} 400,224`} fill="rgba(3,105,234,0.10)" opacity={Math.max(0, (progress - 0.2) / 0.8)} />

        <polyline points={cost} fill="none" stroke={GLASS.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} opacity={0.75} />
        <polyline points={demands} fill="none" stroke={GLASS.blue} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={off} />

        <circle cx={400} cy={44} r={7} fill={GLASS.blue} opacity={p} />
        <circle cx={400} cy={202} r={6} fill={GLASS.ink} opacity={p * 0.75} />

        <text x={250} y={36} fill={GLASS.blue} opacity={p} style={{ font: `600 22px ${FONT}` }}>Demandes ↑</text>
        <text x={62} y={214} fill={GLASS.inkSoft} opacity={p} style={{ font: `600 20px ${FONT}` }}>Coût d'acquisition ↓</text>
      </svg>
    </div>
  );
};
