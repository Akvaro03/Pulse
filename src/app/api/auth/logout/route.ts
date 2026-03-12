import { logoutHandler } from "@/src/features/auth/auth.controller";
import requireAuth from "@/src/utils/requireAuth";

export async function POST(req: Request) {
  const session = requireAuth(req);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return logoutHandler({ userId: session });
}
