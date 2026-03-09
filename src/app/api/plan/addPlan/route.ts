import { addPlanHandler } from "@/src/features/plans/plans.controller";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await addPlanHandler(body);

  return Response.json(result.body, { status: result.status });
}
