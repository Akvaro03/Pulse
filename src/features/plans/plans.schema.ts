import { z } from "zod";
import { trainingDaySchema } from "../dayTraining/day.schema";

export const AddPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required").max(255),

  description: z.string().max(1000).optional(),

  color: z.string().max(50).optional(),

  icon: z.string().max(50).optional(),

  days: z.array(trainingDaySchema).max(14).optional(),
});
export type AddPlanDTO = z.infer<typeof AddPlanSchema>;

export const UpdatePlanSchema = AddPlanSchema.extend({
  planId: z.number(),
});
export type UpdatePlanDTO = z.infer<typeof UpdatePlanSchema>;
export const DeletePlanSchema = z.object({
  planId: z.number(),
});
export type DeletePlanDTO = z.infer<typeof DeletePlanSchema>;
