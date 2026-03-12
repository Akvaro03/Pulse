import { addPlanHandler } from "@/src/features/plans/plans.controller";
import requireAuth from "@/src/utils/requireAuth";

export async function POST(req: Request) {
  const session = requireAuth(req);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const result = await addPlanHandler({ ...body, userId: session });

  return Response.json(result.body, { status: result.status });
}
