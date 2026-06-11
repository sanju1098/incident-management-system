import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(5000),
    attachments: z
      .array(
        z.object({
          url: z.string(),
          publicId: z.string(),
        }),
      )
      .optional(),
    mentions: z.array(z.string()).optional(),
  }),
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(5000),
  }),
});
