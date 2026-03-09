import { DayRepository } from "./day.repo";
import { ToggleRestDayDTO } from "./day.schema";

export class DayTrainingService {
  private dayRepository = new DayRepository();

  async toggleRestDay(dto: ToggleRestDayDTO) {
    const created = await this.dayRepository.getDayByPlanIdAndDay(
      dto.planId,
      dto.day,
    );
    if (created) {
      await this.dayRepository.updateDay(created.id, dto.isRest);
    } else {
      await this.dayRepository.createDay(dto.planId, dto.day, dto.isRest);
    }
    return created;
  }
}
