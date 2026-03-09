import { toggleRestDayHandler } from "@/src/features/dayTraining/day.controller";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await toggleRestDayHandler(body);

  return Response.json(result.body, { status: result.status });
}
