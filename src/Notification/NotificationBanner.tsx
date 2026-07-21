import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import type { NotificationProps } from "./schema";

// iOS-style notification banner: slides in from the top within the first
// second, holds, then auto-dismisses back up — like a real iPhone banner.
export const NotificationBanner: React.FC<NotificationProps> = ({
  appName,
  title,
  message,
  time,
}) => {
  const frame = useCurrentFrame();

  // Slide down (frames 12 → 30), hold, slide back up (frames 150 → 168).
  const translateY = interpolate(
    frame,
    [12, 30, 150, 168],
    [-320, 0, 0, -320],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const opacity = interpolate(frame, [12, 26, 152, 166], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [12, 32], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Interactive.Div
      name="Notification banner"
      style={{
        position: "absolute",
        top: 58,
        left: 16,
        right: 16,
        translate: `0px ${translateY}px`,
        scale,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 18px",
        borderRadius: 26,
        background: "rgba(248, 248, 250, 0.72)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 18px 45px rgba(0, 0, 0, 0.28)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* App icon */}
      <div
        style={{
          flexShrink: 0,
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "linear-gradient(135deg, #ff6a3d 0%, #ff2d55 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          boxShadow: "0 4px 12px rgba(255, 45, 85, 0.35)",
        }}
      >
        🔔
      </div>

      {/* Text column */}
      <div style={{ flex: 1, minWidth: 0, color: "#111" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: "rgba(60, 60, 67, 0.7)",
            }}
          >
            {appName}
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "rgba(60, 60, 67, 0.55)",
            }}
          >
            {time}
          </span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 23,
            fontWeight: 400,
            lineHeight: 1.25,
            marginTop: 2,
            color: "rgba(30, 30, 34, 0.92)",
          }}
        >
          {message}
        </div>
      </div>
    </Interactive.Div>
  );
};
