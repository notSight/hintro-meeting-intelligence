import { z } from "zod";

export const updateActionItemSchema = z.object({
  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]),
});