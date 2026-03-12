import { registerHandler } from "@/src/features/auth/auth.controller";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  return registerHandler(body);
}
