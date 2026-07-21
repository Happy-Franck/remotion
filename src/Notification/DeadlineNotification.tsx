import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { NotificationBanner } from "./NotificationBanner";
import type { NotificationProps } from "./schema";

// Soda-can product animation as the real background video, with a deadline
// notification banner overlaid within the first two seconds.
export const DeadlineNotification: React.FC<NotificationProps> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence name="Background video">
        <OffthreadVideo
          src={staticFile("soda-can.webm")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>
      <Sequence name="Deadline notification" layout="none">
        <NotificationBanner {...props} />
      </Sequence>
    </AbsoluteFill>
  );
};
