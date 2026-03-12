import { DayRepository } from "../dayTraining/day.repo";
import { ExerciseRepository } from "./exercise.repo";
import { AddExerciseDTO, DeleteExerciseDTO } from "./plans.schema";

export class ExerciseService {
  private exerciseRepository = new ExerciseRepository();
  private dayRepository = new DayRepository();

  async addExercise(dto: AddExerciseDTO) {
    const dayExisted = await this.dayRepository.getDayByPlanIdAndDay(
      dto.planId,
      dto.day,
    );

    if (dayExisted) {
      await this.exerciseRepository.createExercise({
        dayId: dayExisted.id,
        exercise: dto.exercise,
      });
      await this.dayRepository.updateDay(dayExisted.id, false);
    } else {
      const createdDay = await this.dayRepository.createDay(
        dto.planId,
        dto.day,
        false,
      );
      await this.exerciseRepository.createExercise({
        dayId: createdDay.id,
        exercise: dto.exercise,
      });
    }
    return dayExisted;
  }

  async deleteExercise(dto: DeleteExerciseDTO){
    return this.exerciseRepository.deleteExercise(dto)
  }
}
