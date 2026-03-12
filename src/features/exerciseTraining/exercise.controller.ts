import { ExerciseService } from "./exercise.service";
import { AddExerciseSchema, DeleteExerciseSchema } from "./plans.schema";
const exerciseService = new ExerciseService();

export async function AddExerciseHandler(input: unknown) {
  const parsed = AddExerciseSchema.safeParse(input);
  if (!parsed.success) {
    console.log(parsed.error)
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await exerciseService.addExercise(parsed.data);
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
export async function DeleteExerciseHandler(input: unknown) {
  const parsed = DeleteExerciseSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await exerciseService.deleteExercise(parsed.data);
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
