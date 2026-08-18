import { COLORS, FONT } from "../theme";

// Scene 3 chart: demands rising (blue) while acquisition cost falls
// (anthracite). `progress` (0..1) draws both lines on.
const demands = "40,196 120,182 200,150 280,104 350,72 392,50";
const cost = "40,66 120,82 200,120 280,152 350,180 392,200";

export const GrowthChart: React.FC<{ size?: number; progress?: number }> = ({
  size = 620,
  progress = 1,
}) => {
  const off = 100 - progress * 100;
  const endDemand = { x: 392, y: 50 };
  const endCost = { x: 392, y: 200 };
  const dotP = Math.min(1, progress);

  return (
    <svg width={size} height={(size * 260) / 432} viewBox="0 0 432 260">
      {/* axes */}
      <line x1={40} y1={16} x2={40} y2={224} stroke={COLORS.paperEdge} strokeWidth={2} />
      <line x1={40} y1={224} x2={410} y2={224} stroke={COLORS.paperEdge} strokeWidth={2} />

      {/* area under demand */}
      <polygon
        points={`40,224 ${demands} 392,224`}
        fill="rgba(3,105,234,0.10)"
        opacity={Math.max(0, (progress - 0.2) / 0.8)}
      />

      <polyline
        points={cost}
        fill="none"
        stroke={COLORS.anthracite}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={off}
      />
      <polyline
        points={demands}
        fill="none"
        stroke={COLORS.blue}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={off}
      />

      {/* end markers */}
      <circle cx={endDemand.x} cy={endDemand.y} r={7} fill={COLORS.blue} opacity={dotP} />
      <circle cx={endCost.x} cy={endCost.y} r={6} fill={COLORS.anthracite} opacity={dotP} />

      {/* labels */}
      <text
        x={250}
        y={40}
        fill={COLORS.blue}
        opacity={dotP}
        style={{ font: `600 22px ${FONT}` }}
      >
        Demandes ↑
      </text>
      <text
        x={70}
        y={210}
        fill={COLORS.anthracite}
        opacity={dotP}
        style={{ font: `600 20px ${FONT}` }}
      >
        Coût d'acquisition ↓
      </text>
    </svg>
  );
};
