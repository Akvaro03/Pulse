import { AddExerciseHandler } from "@/src/features/exerciseTraining/exercise.controller";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await AddExerciseHandler(body);

  return Response.json(result.body, { status: result.status });
}
