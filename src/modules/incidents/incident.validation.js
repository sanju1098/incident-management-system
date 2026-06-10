import { z } from "zod";

export const createIncidentSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    severity: z.enum(["Low", "Medium", "High", "Critical"]),
    serviceAffected: z.string().min(2),
    assignedTeam: z.string().optional(),
    assignee: z.string().optional(),
    tags: z.array(z.string()).optional(),
    attachments: z
      .array(
        z.object({
          url: z.string(),
          publicId: z.string(),
        }),
      )
      .optional(),
  }),
});
export const updateIncidentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    severity: z.enum(["Low", "Medium", "High", "Critical"]).optional(),
    status: z
      .enum(["Open", "Investigating", "Identified", "Monitoring", "Resolved"])
      .optional(),
    serviceAffected: z.string().optional(),
    assignedTeam: z.string().optional(),
    assignee: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
