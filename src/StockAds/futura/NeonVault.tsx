import { NEON, glow } from "./neon";

// Futuristic self-storage node: a holographic vault whose unit cells light up
// bottom-up as it fills. Replaces the flat "house" pictogram.
export const NeonVault: React.FC<{
  size?: number;
  cells?: number;
  filled?: number;
  hue?: string;
}> = ({ size = 250, cells = 5, filled = 0, hue = NEON.blue }) => {
  const vbW = 200;
  const vbH = 240;
  // The hex frame's sides only run parallel (full width) between y=44 and
  // y=196 — above/below that it tapers to a point. Cell rows must fit inside
  // that 152px band or they poke out past the diagonal edges.
  const cellH = 22;
  const gap = 6;
  const top = 53;
  const cols = 2;

  return (
    <svg
      width={size}
      height={(size * vbH) / vbW}
      viewBox={`0 0 ${vbW} ${vbH}`}
      style={{ filter: glow(hue, 18), overflow: "visible" }}
    >
      {/* hex frame */}
      <polygon
        points="100,6 176,44 176,196 100,234 24,196 24,44"
        fill="rgba(3,105,234,0.06)"
        stroke={hue}
        strokeWidth={2.5}
      />
      {/* header bar — narrower than the cell rows since the hex tapers above y=44 */}
      <line x1={55} y1={30} x2={145} y2={30} stroke={NEON.blueGlow} strokeWidth={2} opacity={0.6} />

      {/* unit cells (fill from bottom) */}
      {new Array(cells).fill(0).map((_, r) => {
        const rowFromBottom = cells - 1 - r;
        return new Array(cols).fill(0).map((__, c) => {
          const idx = rowFromBottom * cols + c;
          const on = idx < filled * cols;
          const x = 44 + c * (58 + 12);
          const y = top + r * (cellH + gap);
          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={58}
              height={cellH}
              rx={4}
              fill={on ? hue : "rgba(58,160,255,0.05)"}
              stroke={on ? NEON.blueGlow : "rgba(58,160,255,0.25)"}
              strokeWidth={1.5}
            />
          );
        });
      })}

      {/* base glow line + reflection */}
      <line x1={30} y1={224} x2={170} y2={224} stroke={NEON.cyan} strokeWidth={2} />
      <ellipse cx={100} cy={236} rx={70} ry={6} fill={hue} opacity={0.25} />
    </svg>
  );
};
