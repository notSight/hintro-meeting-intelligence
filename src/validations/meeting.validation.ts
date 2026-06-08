import { z } from "zod";

const transcriptEntrySchema = z.object({
  timestamp: z.string(),
  speaker: z.string(),
  text: z.string(),
});

export const createMeetingSchema = z.object({
  title: z.string().min(1),
  participants: z.array(z.string().email()),
  meetingDate: z.string().datetime(),
  transcript: z.array(transcriptEntrySchema),
});