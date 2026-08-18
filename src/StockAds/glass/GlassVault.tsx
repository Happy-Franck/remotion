import { roundedPolygonPath } from "../prime/geom";
import { GLASS } from "./theme";

// Frosted-glass storage vault: a translucent rounded-hex shell (blurred
// backdrop, soft white tint) whose unit cells fill bottom-up with a gentle
// blue glow — the glass counterpart to the neon vault in Futura/Prime.
const HEX_POINTS = [
  { x: 100, y: 6 },
  { x: 176, y: 44 },
  { x: 176, y: 196 },
  { x: 100, y: 234 },
  { x: 24, y: 196 },
  { x: 24, y: 44 },
];
const HEX_PATH = roundedPolygonPath(HEX_POINTS, 12);

export const GlassVault: React.FC<{ size?: number; cells?: number; filled?: number; accent?: string }> = ({
  size = 250,
  cells = 5,
  filled = 0,
  accent = GLASS.blue,
}) => {
  const vbW = 200;
  const vbH = 240;
  const cellH = 22;
  const gap = 6;
  const top = 53;
  const cols = 2;

  return (
    <div style={{ width: size, height: (size * vbH) / vbW, filter: "drop-shadow(0 14px 30px rgba(20,50,100,0.18))" }}>
      <svg width={size} height={(size * vbH) / vbW} viewBox={`0 0 ${vbW} ${vbH}`} style={{ overflow: "visible" }}>
        <defs>
          <clipPath id="glassVaultClip">
            <path d={HEX_PATH} />
          </clipPath>
        </defs>

        <path d={HEX_PATH} fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.75)" strokeWidth={2.5} />
        <path d={HEX_PATH} fill="none" stroke={accent} strokeWidth={1.4} opacity={0.5} />

        <line x1={55} y1={30} x2={145} y2={30} stroke={accent} strokeWidth={2} opacity={0.45} />

        <g clipPath="url(#glassVaultClip)">
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
                  rx={5}
                  fill={on ? accent : "rgba(255,255,255,0.55)"}
                  fillOpacity={on ? 0.85 : 1}
                  stroke={on ? accent : "rgba(3,105,234,0.18)"}
                  strokeWidth={1.2}
                />
              );
            });
          })}
        </g>

        <line x1={30} y1={224} x2={170} y2={224} stroke={accent} strokeWidth={2} opacity={0.5} />
        <ellipse cx={100} cy={236} rx={70} ry={6} fill={accent} opacity={0.12} />
      </svg>
    </div>
  );
};
