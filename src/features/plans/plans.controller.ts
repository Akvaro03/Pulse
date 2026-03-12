import {
  AddPlanSchema,
  DeletePlanSchema,
  getPlansByIdSchema,
  UpdatePlanSchema,
} from "./plans.schema";
import { PlansService } from "./plans.service";

const plansService = new PlansService();

export async function addPlanHandler(input: unknown) {
  console.log(input);
  const parsed = AddPlanSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await plansService.addPlan(parsed.data);
    return { status: 201, body: { user } };
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return { status: 409, body: { error: "EMAIL_ALREADY_EXISTS" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
export async function updatePlanHandler(input: unknown) {
  const parsed = UpdatePlanSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await plansService.updatePlan(parsed.data);
    return { status: 201, body: { user } };
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return { status: 409, body: { error: "EMAIL_ALREADY_EXISTS" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
export async function deletePlanHandler(input: unknown) {
  const parsed = DeletePlanSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await plansService.deletePlan(parsed.data.planId);
    return { status: 201, body: { user } };
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return { status: 409, body: { error: "EMAIL_ALREADY_EXISTS" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
export async function getPlansHandler(input: unknown) {
  try {
    const parsed = getPlansByIdSchema.safeParse(input);
    if (!parsed.success) {
      return {
        status: 400,
        body: { error: "INVALID_BODY", details: parsed.error },
      };
    }
    const plans = await plansService.getPlans(parsed.data?.userId);

    return { status: 200, body: plans };
  } catch {
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
