import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { z } from "zod";
import { FADE } from "../components/SceneKit";
import { SCENES } from "../theme";
import { FuturaBg } from "./FuturaBg";
import { FuturaSubtitles } from "./FuturaSubtitles";
import { NEON } from "./neon";
import { FScene1 } from "./scenes/FScene1";
import { FScene2 } from "./scenes/FScene2";
import { FScene3 } from "./scenes/FScene3";
import { FScene4 } from "./scenes/FScene4";
import { FScene5 } from "./scenes/FScene5";
import { FScene6 } from "./scenes/FScene6";

export const stockAdsFuturaSchema = z.object({
  showSubtitles: z.boolean(),
});

const order = [
  { key: "s1", C: FScene1 },
  { key: "s2", C: FScene2 },
  { key: "s3", C: FScene3 },
  { key: "s4", C: FScene4 },
  { key: "s5", C: FScene5 },
  { key: "s6", C: FScene6 },
] as const;

// Futuristic holographic-HUD version of the StockAds spot, with a synthesised
// sound bed (see public/futura-audio.mp3): evolving drone, transition
// whooshes on each scene cut, and a riser + impact into the signature.
export const StockAdsFutura: React.FC<z.infer<typeof stockAdsFuturaSchema>> = ({
  showSubtitles,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: NEON.void }}>
      <Audio src={staticFile("futura-audio.mp3")} />
      <Audio src={staticFile("voiceover-fr.mp3")} />

      <FuturaBg />

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
          <FuturaSubtitles />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
