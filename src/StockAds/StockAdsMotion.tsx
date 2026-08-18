import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { z } from "zod";
import { FADE } from "./components/SceneKit";
import { Subtitles } from "./components/Subtitles";
import { Scene1Problem } from "./scenes/Scene1Problem";
import { Scene2Solution } from "./scenes/Scene2Solution";
import { Scene3Acquisition } from "./scenes/Scene3Acquisition";
import { Scene4Scale } from "./scenes/Scene4Scale";
import { Scene5Growth } from "./scenes/Scene5Growth";
import { Scene6Signature } from "./scenes/Scene6Signature";
import { COLORS, SCENES } from "./theme";

export const stockAdsSchema = z.object({
  showSubtitles: z.boolean(),
});

// Scenes crossfade: each (after the first) starts FADE frames early and runs
// FADE frames longer, so its fade-in overlaps the previous scene's fade-out.
const order = [
  { key: "s1", C: Scene1Problem },
  { key: "s2", C: Scene2Solution },
  { key: "s3", C: Scene3Acquisition },
  { key: "s4", C: Scene4Scale },
  { key: "s5", C: Scene5Growth },
  { key: "s6", C: Scene6Signature },
] as const;

export const StockAdsMotion: React.FC<z.infer<typeof stockAdsSchema>> = ({
  showSubtitles,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      <Audio src={staticFile("voiceover-fr.mp3")} />

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
      {showSubtitles ? (
        <Sequence name="Subtitles">
          <Subtitles />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
