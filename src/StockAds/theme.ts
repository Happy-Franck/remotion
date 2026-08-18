import { loadFont } from "@remotion/google-fonts/Poppins";

// Poppins per the brief (SemiBold / Bold for all on-screen text).
const { fontFamily: poppins } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
});

export const FONT = poppins;

// Brand colours extracted from the logo (see brief §3).
export const COLORS = {
  blue: "#0369EA",
  blueDeep: "#0257C4",
  blueSoft: "#3B8BF0",
  anthracite: "#353434",
  anthraciteSoft: "#4A4948",
  white: "#FFFFFF",
  paper: "#F5F7FA", // very light cool white for "light" scenes
  paperEdge: "#E4E9F2",
  mutedOnLight: "#6B7280",
  mutedOnDark: "rgba(255,255,255,0.62)",
} as const;

export const FPS = 30;

// Composition sizing (4:5 LinkedIn master).
export const W = 1080;
export const H = 1350;

// Scene timing in frames (30fps). Total = 1200 frames = 40s.
export const SCENES = {
  s1: { from: 0, dur: 210 }, // 0:00–0:07  Le problème
  s2: { from: 210, dur: 180 }, // 0:07–0:13  La solution
  s3: { from: 390, dur: 210 }, // 0:13–0:20  L'acquisition
  s4: { from: 600, dur: 210 }, // 0:20–0:27  À chaque échelle
  s5: { from: 810, dur: 210 }, // 0:27–0:34  Passer à l'échelle
  s6: { from: 1020, dur: 180 }, // 0:34–0:40  Signature
} as const;

export const TOTAL_FRAMES = 1200;
