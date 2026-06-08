import { z } from "zod";

const citationSchema = z.object({
  timestamp: z.string(),
});

const summarySchema = z.object({
  text: z.string(),
  citations: z.array(citationSchema),
});

const actionItemSchema = z.object({
  task: z.string(),
  assignee: z.string(),
  citations: z.array(citationSchema),
});

const decisionSchema = z.object({
  text: z.string(),
  citations: z.array(citationSchema),
});

const followUpSchema = z.object({
  text: z.string(),
  citations: z.array(citationSchema),
});

export const aiResponseSchema = z.object({
  summary: z.array(summarySchema),
  actionItems: z.array(actionItemSchema),
  decisions: z.array(decisionSchema),
  followUps: z.array(followUpSchema),
});