import { COLORS } from "../theme";

// The reusable brand motif: a hexagon (like the logo mark) containing an
// ascending chevron = growth. `progress` (0..1) draws the outline on and
// reveals the chevron, for signature-style reveals.
export const HexChevron: React.FC<{
  size?: number;
  outline?: string;
  chevron?: string;
  stroke?: number;
  progress?: number;
  double?: boolean;
}> = ({
  size = 120,
  outline = COLORS.anthracite,
  chevron = COLORS.blue,
  stroke = 7,
  progress = 1,
  double = false,
}) => {
  const hexOffset = 100 - progress * 100;
  const chevronOpacity = Math.max(0, (progress - 0.55) / 0.45);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon
        points="25,6 75,6 97,50 75,94 25,94 3,50"
        fill="none"
        stroke={outline}
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={hexOffset}
      />
      <polyline
        points="30,60 50,40 70,60"
        fill="none"
        stroke={chevron}
        strokeWidth={stroke + 2}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={chevronOpacity}
      />
      {double ? (
        <polyline
          points="30,74 50,54 70,74"
          fill="none"
          stroke={chevron}
          strokeWidth={stroke + 2}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={chevronOpacity * 0.55}
        />
      ) : null}
    </svg>
  );
};
