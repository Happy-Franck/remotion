import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, SCENES } from "../theme";

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

// Per the brief's alternate subtitle style: Poppins SemiBold with a slight
// drop shadow for legibility (no banner) — 2 lines max, lower third, inside
// the safe zone, synced to the voiceover. Since this version's scenes
// alternate light/anthracite per the brief's art-direction note, the text
// colour and shadow direction adapt to whichever is showing so it always
// reads as "white + shadow" against dark, and its light-background
// equivalent against paper.
const isDarkSceneAt = (f: number): boolean => {
  if (f < SCENES.s2.from) return false;
  if (f < SCENES.s3.from) return true;
  if (f < SCENES.s4.from) return false;
  if (f < SCENES.s5.from) return true;
  if (f < SCENES.s6.from) return false;
  return true;
};

export const EditorialSubtitles: React.FC = () => {
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
  const dark = isDarkSceneAt(frame);

  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: 160, display: "flex", justifyContent: "center", opacity }}>
      <div
        style={{
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1.3,
          color: dark ? "#FFFFFF" : "#232323",
          textShadow: dark
            ? "0 2px 10px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.7)"
            : "0 0 10px rgba(255,255,255,0.9), 0 1px 3px rgba(255,255,255,0.9)",
        }}
      >
        <div>{cue.l1}</div>
        <div>{cue.l2}</div>
      </div>
    </div>
  );
};
