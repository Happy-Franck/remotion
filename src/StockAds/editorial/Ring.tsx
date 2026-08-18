// The recurring visual signature of this version: a thin glowing ring that
// draws itself on — inspired by the reference reel's minimal progress-ring
// motif. `progress` (0..1) is the drawn fraction; `trackColor` (optional)
// draws a faint full circle underneath for context.
export const Ring: React.FC<{
  size?: number;
  progress?: number;
  color: string;
  trackColor?: string;
  strokeWidth?: number;
  glow?: number;
  children?: React.ReactNode;
}> = ({ size = 320, progress = 1, color, trackColor, strokeWidth = 3, glow = 14, children }) => {
  const r = size / 2 - strokeWidth;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, progress)) * c;

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
        {trackColor ? <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} /> : null}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - dash}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 ${glow}px ${color}99)` }}
        />
      </svg>
      {children}
    </div>
  );
};
