import { useCurrentFrame } from "remotion";
import { roundedPolygonPath } from "./geom";
import { glow, NEON } from "./theme";

// A small holographic storage centre — a proper pretty "house": a gently
// rounded gable roof, a hexagonal gable window (the brand motif as a window,
// not a badge), and a row of roller-door units that light up left-to-right
// as they fill. Reads clearly as a building, with a slow scan highlight and
// an idle outer pulse ring for polish.
const ROOF_PATH = roundedPolygonPath(
  [
    { x: 10, y: 66 },
    { x: 110, y: 20 },
    { x: 210, y: 66 },
  ],
  6,
);

const gableHex = (cx: number, cy: number, r: number) =>
  new Array(6)
    .fill(0)
    .map((_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    })
    .join(" ");

export const Vault: React.FC<{
  size?: number;
  cells?: number;
  filled?: number;
  hue?: string;
  pulseSeed?: number;
}> = ({ size = 250, cells = 5, filled = 0, hue = NEON.blue, pulseSeed = 0 }) => {
  const frame = useCurrentFrame();
  const vbW = 220;
  const vbH = 210;

  const facade = { x: 20, y: 66, w: 180, h: 116, r: 16 };
  const pad = 15;
  const gap = 7;
  const doorW = (facade.w - pad * 2 - (cells - 1) * gap) / cells;
  const doorH = 60;
  const doorY = facade.y + facade.h - doorH - 14;

  const scanY = facade.y + ((frame * 1.4 + pulseSeed * 40) % (facade.h - 20));
  const ring = ((frame + pulseSeed * 30) % 90) / 90;
  const cx = vbW / 2;
  const cy = (facade.y + facade.h) / 2;

  return (
    <svg width={size} height={(size * vbH) / vbW} viewBox={`0 0 ${vbW} ${vbH}`} style={{ filter: glow(hue, 16), overflow: "visible" }}>
      <defs>
        <clipPath id={`houseClip-${pulseSeed}`}>
          <rect x={facade.x} y={facade.y} width={facade.w} height={facade.h} rx={facade.r} />
        </clipPath>
        <linearGradient id={`roofGrad-${pulseSeed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hue} stopOpacity={0.55} />
          <stop offset="100%" stopColor={hue} stopOpacity={0.18} />
        </linearGradient>
        <linearGradient id={`scanGrad-${pulseSeed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={NEON.cyan} stopOpacity={0} />
          <stop offset="50%" stopColor={NEON.cyan} stopOpacity={0.45} />
          <stop offset="100%" stopColor={NEON.cyan} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* idle outer pulse halo around the whole house */}
      <rect
        x={facade.x - 10}
        y={12}
        width={facade.w + 20}
        height={facade.h + 64}
        rx={22}
        fill="none"
        stroke={hue}
        strokeWidth={1.6}
        opacity={(1 - ring) * 0.3}
        transform={`scale(${1 + ring * 0.08}) translate(${-cx * ring * 0.08} ${-cy * ring * 0.08})`}
      />

      {/* roof */}
      <path d={ROOF_PATH} fill={`url(#roofGrad-${pulseSeed})`} stroke={hue} strokeWidth={2.5} strokeLinejoin="round" />
      <line x1={34} y1={66} x2={186} y2={66} stroke={NEON.blueGlow} strokeWidth={2} opacity={0.55} />

      {/* gable window — the brand hexagon, as a window */}
      <polygon points={gableHex(110, 50, 13)} fill="rgba(5,10,24,0.55)" stroke={hue} strokeWidth={2} />
      <circle cx={110} cy={50} r={4} fill={NEON.cyan} opacity={0.9} />

      {/* facade */}
      <rect x={facade.x} y={facade.y} width={facade.w} height={facade.h} rx={facade.r} fill="rgba(3,105,234,0.06)" stroke={hue} strokeWidth={2.5} />

      <g clipPath={`url(#houseClip-${pulseSeed})`}>
        {/* roller-door units, filling left to right */}
        {new Array(cells).fill(0).map((_, i) => {
          const on = i < filled;
          const x = facade.x + pad + i * (doorW + gap);
          return (
            <g key={i}>
              <rect
                x={x}
                y={doorY}
                width={doorW}
                height={doorH}
                rx={5}
                fill={on ? hue : "rgba(58,160,255,0.05)"}
                stroke={on ? NEON.blueGlow : "rgba(58,160,255,0.25)"}
                strokeWidth={1.4}
              />
              {[0, 1, 2].map((s) => (
                <line
                  key={s}
                  x1={x + 3}
                  x2={x + doorW - 3}
                  y1={doorY + 12 + s * 16}
                  y2={doorY + 12 + s * 16}
                  stroke={on ? "rgba(255,255,255,0.4)" : "rgba(58,160,255,0.2)"}
                  strokeWidth={1.2}
                />
              ))}
            </g>
          );
        })}

        {/* slow scan highlight sweeping the facade */}
        <rect x={facade.x} y={scanY} width={facade.w} height={22} fill={`url(#scanGrad-${pulseSeed})`} opacity={0.5} />
      </g>

      {/* ground glow */}
      <line x1={facade.x + 6} y1={facade.y + facade.h + 12} x2={facade.x + facade.w - 6} y2={facade.y + facade.h + 12} stroke={NEON.cyan} strokeWidth={2} opacity={0.7} />
      <ellipse cx={vbW / 2} cy={facade.y + facade.h + 22} rx={facade.w * 0.42} ry={6} fill={hue} opacity={0.22} />
    </svg>
  );
};
