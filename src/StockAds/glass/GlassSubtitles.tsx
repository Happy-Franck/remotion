import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./theme";

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

// Per the brief: white Poppins SemiBold on a semi-transparent banner, lower
// third, inside the safe zone. Dark pill (not glass) so it stays legible
// against the bright studio background.
export const GlassSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cue = CUES.find((c) => t >= c.from && t <= c.to);
  if (!cue) {
    return null;
  }
  const opacity = interpolate(t, [cue.from, cue.from + 0.25, cue.to - 0.25, cue.to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center", opacity }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 60px",
          padding: "18px 30px",
          borderRadius: 18,
          background: "rgba(20,28,40,0.68)",
          backdropFilter: "blur(6px)",
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1.28,
          color: "#FFFFFF",
          textShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}
      >
        <div>{cue.l1}</div>
        <div>{cue.l2}</div>
      </div>
    </div>
  );
};
