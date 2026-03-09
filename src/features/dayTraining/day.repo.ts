import prisma from "@/src/utils/prisma";

export class DayRepository {
  async getDayByPlanIdAndDay(planId: number, day: string) {
    return prisma.training_day.findFirst({
      where: {
        training_plan_id: planId,
        day_name: day,
      },
    });
  }

  async createDay(planId: number, day: string, isRest: boolean) {
    return prisma.training_day.create({
      data: {
        training_plan_id: planId,
        day_name: day,
        is_rest: isRest,
      },
    });
  }

  async updateDay(id: number, isRest: boolean) {
    return prisma.training_day.update({
      where: {
        id,
      },
      data: {
        is_rest: isRest,
      },
    });
  }
}
