import prisma from "@/src/utils/prisma";
import { UpdatePlanDTO } from "./plans.schema";

export class PlanRepository {
  async createPlan(data: {
    name: string;
    color: string | undefined;
    user_id: number;
    description?: string;
    icon?: string;
  }) {
    return await prisma.training_plan.create({
      data: {
        name: data.name,
        color: data.color,
        user_id: data.user_id,
        description: data.description,
        icon: data.icon,
      },
    });
  }

  async updatePlan(data: UpdatePlanDTO) {
    return await prisma.training_plan.update({
      where: { id: data.planId },
      data: {
        name: data.name,
        color: data.color,
        description: data.description,
        icon: data.icon,
      },
    });
  }

  async deletePlan(planId: number) {
    return await prisma.training_plan.delete({
      where: { id: planId },
    });
  }

  async getPlans() {
    return await prisma.training_plan.findMany({
      include: { training_day: { include: { training_exercise: true } } },
      orderBy: { created_at: "asc" },
    });
  }
  async getPlansByUserId(userId: number) {
    return await prisma.training_plan.findMany({
      where: {
        user_id: userId,
      },
      include: { training_day: { include: { training_exercise: true } } },
      orderBy: { created_at: "asc" },
    });
  }
}
