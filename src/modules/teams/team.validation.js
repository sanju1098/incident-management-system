import { z } from "zod";

// Create Team Validation Schema
export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().optional(),
  }),
});

// Update Team Validation Schema
export const updateTeamSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
  }),
});

// Assign Team Members Validation Schema
export const assignMembersSchema = z.object({
  body: z.object({
    memberIds: z.array(z.string()),
  }),
});
