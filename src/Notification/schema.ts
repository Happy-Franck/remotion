import { z } from "zod";

export const notificationSchema = z.object({
  appName: z.string(),
  title: z.string(),
  message: z.string(),
  time: z.string(),
});

export type NotificationProps = z.infer<typeof notificationSchema>;
