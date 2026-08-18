import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { z } from "zod";
import { FADE } from "../components/SceneKit";
import { SCENES } from "../theme";
import { PrimeBg } from "./PrimeBg";
import { PrimeSubtitles } from "./PrimeSubtitles";
import { PScene1 } from "./scenes/PScene1";
import { PScene2 } from "./scenes/PScene2";
import { PScene3 } from "./scenes/PScene3";
import { PScene4 } from "./scenes/PScene4";
import { PScene5 } from "./scenes/PScene5";
import { PScene6 } from "./scenes/PScene6";
import { SceneTransition } from "./SceneTransition";
import { NEON } from "./theme";

export const stockAdsPrimeSchema = z.object({
  showSubtitles: z.boolean(),
});

const order = [
  { key: "s1", C: PScene1 },
  { key: "s2", C: PScene2 },
  { key: "s3", C: PScene3 },
  { key: "s4", C: PScene4 },
  { key: "s5", C: PScene5 },
  { key: "s6", C: PScene6 },
] as const;

// "Prime" — the refined holographic version: parallax depth (dual starfields,
// nebula drift, perspective floor), glitch-wipe transitions between scenes
// instead of a flat crossfade, kinetic (word-by-word blur-in) typography,
// rounded-hex components with idle pulses, a comet-lit network + chart, a
// particle-assembly logo reveal in the signature, and a richer, more
// purposeful sound design (see public/prime-audio.mp3) tightly synced to
// each cut.
export const StockAdsPrime: React.FC<z.infer<typeof stockAdsPrimeSchema>> = ({
  showSubtitles,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: NEON.void }}>
      <Audio src={staticFile("prime-audio.mp3")} />
      <PrimeBg />
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
      <SceneTransition />
      {showSubtitles ? (
        <Sequence name="Subtitles">
          <PrimeSubtitles />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
