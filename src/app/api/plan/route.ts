import { getPlansHandler } from "@/src/features/plans/plans.controller";

export async function GET() {
  const result = await getPlansHandler();
  return Response.json(result.body, { status: result.status });
}
