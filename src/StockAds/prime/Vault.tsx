import { useCurrentFrame } from "remotion";
import { roundedPolygonPath } from "./geom";
import { glow, NEON } from "./theme";

// Holographic storage vault: a rounded hex shell (not a sharp polygon —
// reads as a more refined, manufactured object) with unit cells that light
// up bottom-up, a slow vertical scan highlight, and an idle outer pulse ring.
const HEX_POINTS = [
  { x: 100, y: 6 },
  { x: 176, y: 44 },
  { x: 176, y: 196 },
  { x: 100, y: 234 },
  { x: 24, y: 196 },
  { x: 24, y: 44 },
];
const HEX_PATH = roundedPolygonPath(HEX_POINTS, 11);

export const Vault: React.FC<{
  size?: number;
  cells?: number;
  filled?: number;
  hue?: string;
  pulseSeed?: number;
}> = ({ size = 250, cells = 5, filled = 0, hue = NEON.blue, pulseSeed = 0 }) => {
  const frame = useCurrentFrame();
  const vbW = 200;
  const vbH = 240;

  // Cell rows must stay within the hex's parallel band (y 44→196, 152px)
  // or they'd poke out past the diagonal shoulders.
  const cellH = 22;
  const gap = 6;
  const top = 53;
  const cols = 2;

  const scanY = 44 + (((frame * 1.6 + pulseSeed * 40) % 160 + 160) % 160);
  const ring = ((frame + pulseSeed * 30) % 90) / 90; // 0..1 idle pulse ring

  return (
    <svg width={size} height={(size * vbH) / vbW} viewBox={`0 0 ${vbW} ${vbH}`} style={{ filter: glow(hue, 18), overflow: "visible" }}>
      <defs>
        <clipPath id={`vaultClip-${pulseSeed}`}>
          <path d={HEX_PATH} />
        </clipPath>
      </defs>

      {/* idle outer pulse ring */}
      <path d={HEX_PATH} fill="none" stroke={hue} strokeWidth={2} opacity={(1 - ring) * 0.35} transform={`scale(${1 + ring * 0.12}) translate(${-100 * ring * 0.12} ${-120 * ring * 0.12})`} />

      <path d={HEX_PATH} fill="rgba(3,105,234,0.06)" stroke={hue} strokeWidth={2.5} />

      {/* header bar — narrower than the cell rows since the hex tapers above y=44 */}
      <line x1={55} y1={30} x2={145} y2={30} stroke={NEON.blueGlow} strokeWidth={2} opacity={0.6} />

      <g clipPath={`url(#vaultClip-${pulseSeed})`}>
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

        {/* slow vertical scan highlight sweeping through the vault interior */}
        <rect x={20} y={scanY} width={160} height={26} fill={`url(#vaultScanGrad-${pulseSeed})`} opacity={0.5} />
      </g>

      <defs>
        <linearGradient id={`vaultScanGrad-${pulseSeed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={NEON.cyan} stopOpacity={0} />
          <stop offset="50%" stopColor={NEON.cyan} stopOpacity={0.5} />
          <stop offset="100%" stopColor={NEON.cyan} stopOpacity={0} />
        </linearGradient>
      </defs>

      <line x1={30} y1={224} x2={170} y2={224} stroke={NEON.cyan} strokeWidth={2} />
      <ellipse cx={100} cy={236} rx={70} ry={6} fill={hue} opacity={0.25} />
    </svg>
  );
};
