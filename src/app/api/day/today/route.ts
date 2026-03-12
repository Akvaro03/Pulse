import { getTodayDaysHandler } from "@/src/features/dayTraining/day.controller";
import requireAuth from "@/src/utils/requireAuth";

export async function GET(req: Request) {
  const userId = requireAuth(req);
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const result = await getTodayDaysHandler({userId});

  return Response.json(result.body, { status: result.status });
}
