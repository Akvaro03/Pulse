import { PlanRepository } from "./plan.repo";
import { AddPlanDTO, UpdatePlanDTO } from "./plans.schema";

export class PlansService {
  private plans = new PlanRepository();

  async addPlan(dto: AddPlanDTO) {
    const created = await this.plans.createPlan({
      color: dto.color,
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
      user_id: 1,
    });
    return created;
  }

  async updatePlan(dto: UpdatePlanDTO) {
    return await this.plans.updatePlan(dto);
  }

  async getPlans() {
    return await this.plans.getPlans();
  }
  async deletePlan(planId: number) {
    return await this.plans.deletePlan(planId);
  }
}
