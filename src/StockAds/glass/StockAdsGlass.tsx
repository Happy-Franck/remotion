import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { z } from "zod";
import { FADE } from "../components/SceneKit";
import { SCENES } from "../theme";
import { GlassBg } from "./GlassBg";
import { GlassSubtitles } from "./GlassSubtitles";
import { GlassTransition } from "./GlassTransition";
import { GScene1 } from "./scenes/GScene1";
import { GScene2 } from "./scenes/GScene2";
import { GScene3 } from "./scenes/GScene3";
import { GScene4 } from "./scenes/GScene4";
import { GScene5 } from "./scenes/GScene5";
import { GScene6 } from "./scenes/GScene6";
import { GLASS } from "./theme";

export const stockAdsGlassSchema = z.object({
  showSubtitles: z.boolean(),
});

const order = [
  { key: "s1", C: GScene1 },
  { key: "s2", C: GScene2 },
  { key: "s3", C: GScene3 },
  { key: "s4", C: GScene4 },
  { key: "s5", C: GScene5 },
  { key: "s6", C: GScene6 },
] as const;

// "Glass" — a bright, premium cyber-glassmorphism take on the spot: a light
// studio backdrop with drifting bokeh, frosted glass panels, blue/cyan glow
// accents and anthracite Poppins text (closer to the brief's white/anthracite
// note), glass-pane wipe transitions, and a calmer word-by-word kinetic
// headline reveal. Distinct in mood from the dark sci-fi Futura/Prime
// versions while sharing their production system (see public/glass-audio.mp3
// for a softer, chime-led sound design).
export const StockAdsGlass: React.FC<z.infer<typeof stockAdsGlassSchema>> = ({
  showSubtitles,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: GLASS.skyTop }}>
      <Audio src={staticFile("glass-audio.mp3")} />
      <Audio src={staticFile("voiceover-fr.mp3")} />

      <GlassBg />

      {order.map(({ key, C }, i) => {
        const s = SCENES[key];
        const from = i === 0 ? s.from : s.from - FADE;
        const dur = i === 0 ? s.dur : s.dur + FADE;
        return (
          <Sequence key={key} name={key} from={from} durationInFrames={dur}>
            <C dur={dur} />
          </Sequence>
        );
      })}

      <GlassTransition />

      {showSubtitles ? (
        <Sequence name="Subtitles">
          <GlassSubtitles />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
