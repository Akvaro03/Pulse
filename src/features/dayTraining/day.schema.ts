import { z } from "zod";
import { trainingExerciseSchema } from "../exerciseTraining/plans.schema";

export const toggleRestDaySchema = z.object({
  planId: z.number().int().positive(),
  day: z.string().max(100),
  isRest: z.boolean(),
});
export type ToggleRestDayDTO = z.infer<typeof toggleRestDaySchema>;

export const trainingDaySchema = z
  .object({
    day_name: z.string().max(100).optional(),

    is_rest: z.boolean().default(false),

    exercises: z.array(trainingExerciseSchema).default([]),
  })
  .refine(
    (data) => {
      if (data.is_rest && data.exercises.length > 0) {
        return false;
      }
      return true;
    },
    {
      message: "Rest days cannot contain exercises",
      path: ["exercises"],
    },
  );
export const getDayByIdSchema = z.object({
  userId: z.number(),
});
export type getDayByIdDTO = z.infer<typeof getDayByIdSchema>;
