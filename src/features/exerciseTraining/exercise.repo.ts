import prisma from "@/src/utils/prisma";
import { AddExerciseDTO } from "./plans.schema";

export class ExerciseRepository {
  async createExercise(data: {
    dayId: number;
    exercise: AddExerciseDTO["exercise"];
  }) {
    return prisma.training_exercise.create({
      data: {
        training_day_id: data.dayId,
        name: data.exercise.name,
        sets: data.exercise.sets,
        reps: data.exercise.reps,
        rest_seconds: data.exercise.rest_seconds,
        notes: data.exercise.notes,
        order_index: data.exercise.order_index,
      },
    });
  }
}
