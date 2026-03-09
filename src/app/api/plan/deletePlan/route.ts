import { deletePlanHandler } from "@/src/features/plans/plans.controller";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await deletePlanHandler(body);

  return Response.json(result.body, { status: result.status });
}
