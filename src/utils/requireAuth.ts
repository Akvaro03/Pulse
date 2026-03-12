export default function requireAuth(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return Number(userId);
  } catch {}
}
