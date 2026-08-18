import { COLORS } from "../theme";

// A self-storage centre pictogram: a facade with a row of roll-up units.
// `occupied` units light up in brand blue → used to show "empty → filled".
export const StorageCenter: React.FC<{
  size?: number;
  units?: number;
  occupied?: number;
  onDark?: boolean;
}> = ({ size = 260, units = 5, occupied = 0, onDark = false }) => {
  const vbW = 220;
  const vbH = 170;
  const wall = onDark ? "#2B2A2A" : COLORS.white;
  const line = onDark ? "rgba(255,255,255,0.30)" : COLORS.paperEdge;
  const vacant = onDark ? "#201F1F" : COLORS.paper;
  const roof = onDark ? COLORS.anthraciteSoft : "#2F3A4A";

  const pad = 16;
  const doorGap = 8;
  const doorAreaW = vbW - pad * 2;
  const doorW = (doorAreaW - doorGap * (units - 1)) / units;
  const doorTop = 66;
  const doorH = 84;

  return (
    <svg width={size} height={(size * vbH) / vbW} viewBox={`0 0 ${vbW} ${vbH}`}>
      {/* Roof */}
      <path
        d={`M8 46 L110 14 L212 46 Z`}
        fill={roof}
        stroke={roof}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Facade */}
      <rect
        x={10}
        y={46}
        width={200}
        height={112}
        rx={8}
        fill={wall}
        stroke={line}
        strokeWidth={2}
      />
      {/* Units */}
      {new Array(units).fill(0).map((_, i) => {
        const filled = i < occupied;
        const x = pad + i * (doorW + doorGap);
        return (
          <g key={i}>
            <rect
              x={x}
              y={doorTop}
              width={doorW}
              height={doorH}
              rx={4}
              fill={filled ? COLORS.blue : vacant}
              stroke={filled ? COLORS.blueDeep : line}
              strokeWidth={2}
            />
            {[0, 1, 2].map((r) => (
              <line
                key={r}
                x1={x + 4}
                x2={x + doorW - 4}
                y1={doorTop + 20 + r * 20}
                y2={doorTop + 20 + r * 20}
                stroke={filled ? "rgba(255,255,255,0.55)" : line}
                strokeWidth={2}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};
