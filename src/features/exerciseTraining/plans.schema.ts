import { z } from "zod";

export const AddExerciseSchema = z.object({
  planId: z.number().int().positive(),
  day: z.string().max(100),
  exercise: z.object({
    name: z.string().min(1).max(255),
    sets: z.number().int().min(1).max(20).optional(),
    reps: z.string().max(50).optional(),
    notes: z.string().max(300).optional(),
    rest_seconds: z.number().int().min(0).max(600).optional(),
    order_index: z.number().int().min(0).optional(),
  }),
});
export type AddExerciseDTO = z.infer<typeof AddExerciseSchema>;
export const DeleteExerciseSchema = z.object({
  planId: z.number().int().positive(),
  day: z.string().max(100),
  exerciseId: z.number().int().positive(),
});
export type DeleteExerciseDTO = z.infer<typeof DeleteExerciseSchema>;

export const trainingExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required").max(255),

  sets: z.number().int().min(1).max(20).optional(),

  reps: z.string().max(50).optional(),

  notes: z.string().max(1000).optional(),

  rest_seconds: z.number().int().min(0).max(600).optional(),

  order_index: z.number().int().min(0).optional(),
});
