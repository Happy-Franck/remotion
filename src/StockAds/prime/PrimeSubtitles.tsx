import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_MONO, NEON } from "./theme";

type Cue = { from: number; to: number; l1: string; l2: string };

const CUES: Cue[] = [
  { from: 0.2, to: 3.5, l1: "Remplir vos box, développer un centre,", l2: "ou accélérer tout un réseau…" },
  { from: 3.6, to: 6.9, l1: "Un objectif reste essentiel :", l2: "augmenter vos locations." },
  { from: 7.1, to: 12.9, l1: "StockAds développe votre acquisition", l2: "et attire plus de prospects vers vos centres." },
  { from: 13.1, to: 19.9, l1: "Plus de demandes, plus de locations,", l2: "et un coût d'acquisition réduit." },
  { from: 20.1, to: 26.9, l1: "Indépendant, franchisé ou réseau :", l2: "prenez l'avantage sur votre zone." },
  { from: 27.1, to: 33.9, l1: "Quand vos performances suivent,", l2: "vous passez à l'échelle." },
  { from: 34.1, to: 39.8, l1: "StockAds. Plus de clients, moins de coûts,", l2: "plus de croissance." },
];

export const PrimeSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cue = CUES.find((c) => t >= c.from && t <= c.to);
  if (!cue) {
    return null;
  }
  const opacity = interpolate(t, [cue.from, cue.from + 0.2, cue.to - 0.2, cue.to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revealChars = Math.round(
    interpolate(t, [cue.from, cue.from + 0.4], [0, cue.l1.length + cue.l2.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center", opacity }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 60px",
          padding: "16px 30px 16px 22px",
          borderLeft: `3px solid ${NEON.cyan}`,
          borderRadius: 4,
          background: "rgba(5,10,24,0.72)",
          border: `1px solid ${NEON.line}`,
          borderLeftWidth: 3,
          borderLeftColor: NEON.cyan,
          backdropFilter: "blur(6px)",
          textAlign: "center",
          fontFamily: FONT_MONO,
          fontSize: 30,
          lineHeight: 1.32,
          color: NEON.white,
          textShadow: "0 0 10px rgba(58,160,255,0.4)",
        }}
      >
        <div>{cue.l1.slice(0, revealChars)}</div>
        <div>{cue.l2.slice(0, Math.max(0, revealChars - cue.l1.length))}</div>
      </div>
    </div>
  );
};
