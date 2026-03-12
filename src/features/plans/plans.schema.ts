import { z } from "zod";
import { trainingDaySchema } from "../dayTraining/day.schema";

export const AddPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required").max(255),
  userId: z.number().min(0, "User id is required").max(255),
  description: z.string().max(1000).optional(),
  color: z.string().max(50).optional(),
  icon: z.string().max(50).optional(),
  days: z.array(trainingDaySchema).max(14).optional(),
});
export const AddPlanClientSchema = AddPlanSchema.omit({
  userId: true,
});

export type AddPlanDTO = z.infer<typeof AddPlanSchema>;
export type AddPlanClientDTO = z.infer<typeof AddPlanClientSchema>;

export const UpdatePlanSchema = AddPlanSchema.extend({
  planId: z.number(),
});

export const UpdatePlanClientSchema = UpdatePlanSchema.omit({
  userId: true,
});

export type UpdatePlanDTO = z.infer<typeof UpdatePlanSchema>;
export type UpdatePlanClientDTO = z.infer<typeof UpdatePlanClientSchema>;




export const DeletePlanSchema = z.object({
  planId: z.number(),
});
export type DeletePlanDTO = z.infer<typeof DeletePlanSchema>;

export const refreshSessionSchema = z.object({
  refreshToken: z.string(),
});
export type refreshSessionDTO = z.infer<typeof refreshSessionSchema>;

export const getPlansByIdSchema = z.object({
  userId: z.number(),
});
export type getPlansById = z.infer<typeof getPlansByIdSchema>;
