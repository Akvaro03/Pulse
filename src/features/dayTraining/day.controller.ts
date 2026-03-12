import { getDayByIdSchema, toggleRestDaySchema } from "./day.schema";
import { DayTrainingService } from "./day.service";
const dayTrainingService = new DayTrainingService();
export async function toggleRestDayHandler(input: unknown) {
  const parsed = toggleRestDaySchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await dayTrainingService.toggleRestDay(parsed.data);
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

export async function getTodayDaysHandler(input: unknown) {
  try {
    const parsed = getDayByIdSchema.safeParse(input);
    if (!parsed.success) {
      return {
        status: 400,
        body: { error: "INVALID_BODY", details: parsed.error },
      };
    }
    const plans = await dayTrainingService.getTodayDays(parsed.data?.userId);
    return { status: 200, body: plans };
  } catch {
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
