import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { z } from "zod";
import { FADE } from "../components/SceneKit";
import { COLORS, SCENES } from "../theme";
import { EditorialSubtitles } from "./EditorialSubtitles";
import { EScene1 } from "./scenes/EScene1";
import { EScene2 } from "./scenes/EScene2";
import { EScene3 } from "./scenes/EScene3";
import { EScene4 } from "./scenes/EScene4";
import { EScene5 } from "./scenes/EScene5";
import { EScene6 } from "./scenes/EScene6";

export const stockAdsEditorialSchema = z.object({
  showSubtitles: z.boolean(),
});

const order = [
  { key: "s1", C: EScene1 },
  { key: "s2", C: EScene2 },
  { key: "s3", C: EScene3 },
  { key: "s4", C: EScene4 },
  { key: "s5", C: EScene5 },
  { key: "s6", C: EScene6 },
] as const;

// "Editorial" — 100% brief-compliant (exact colours, Poppins, on-screen
// texts and timings, official logo used as-is), styled after the reference
// reel's restrained, premium motion-graphics language: a single thin glowing
// ring motif that draws itself on, generous negative space, small
// typography, no invented on-screen copy beyond what the brief specifies.
// Reuses the brief-validated Bg/Kicker/Headline kit from the classic version.
export const StockAdsEditorial: React.FC<z.infer<typeof stockAdsEditorialSchema>> = ({
  showSubtitles,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      <Audio src={staticFile("editorial-audio.mp3")} />
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
          <EditorialSubtitles />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
