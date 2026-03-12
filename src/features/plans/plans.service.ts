import { PlanRepository } from "./plan.repo";
import { AddPlanDTO, UpdatePlanDTO } from "./plans.schema";

export class PlansService {
  private plans = new PlanRepository();

  async addPlan(dto: AddPlanDTO) {
    return await this.plans.createPlan({
      color: dto.color,
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
      user_id: dto.userId,
    });
  }

  async updatePlan(dto: UpdatePlanDTO) {
    return await this.plans.updatePlan(dto);
  }

  async getPlans(userId: number) {
    return await this.plans.getPlansByUserId(userId);
  }
  async deletePlan(planId: number) {
    return await this.plans.deletePlan(planId);
  }
}
