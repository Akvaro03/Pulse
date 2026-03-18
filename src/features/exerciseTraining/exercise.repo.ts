import prisma from "@/src/utils/prisma";
import { AddExerciseDTO, DeleteExerciseDTO } from "./plans.schema";
import { UpdateExerciseOrderDTO } from "../plans/plans.schema";

export class ExerciseRepository {
  async editExerciseOrder(data: UpdateExerciseOrderDTO) {
    return prisma.training_exercise.update({
      where: { id: data.exerciseId },
      data: { order_index: data.order_index },
    });
  }
  async deleteExercise(data: DeleteExerciseDTO) {
    return prisma.training_exercise.delete({ where: { id: data.exerciseId } });
  }
  async getLastExerciseOrder(data: { dayId: number }) {
    return prisma.training_exercise.findFirst({
      where: { training_day_id: data.dayId },
      orderBy: { order_index: "desc" },
      select: { order_index: true },
    });
  }

  async createExercise(data: {
    dayId: number;
    exercise: AddExerciseDTO["exercise"];
  }) {
    const lasIndex = await this.getLastExerciseOrder({ dayId: data.dayId });
    const newOrder = (lasIndex?.order_index ?? 0) + 1000;
    return prisma.training_exercise.create({
      data: {
        training_day_id: data.dayId,
        name: data.exercise.name,
        sets: data.exercise.sets,
        reps: data.exercise.reps,
        rest_seconds: data.exercise.rest_seconds,
        notes: data.exercise.notes,
        order_index: newOrder,
      },
    });
  }
}
