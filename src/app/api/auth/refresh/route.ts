import { refreshSessionHandler } from "@/src/features/auth/auth.controller";

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get("cookie") || "");
  return refreshSessionHandler(cookies.refresh_token);
}
export function parseCookies(cookieHeader: string) {
  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (!name) return;

    cookies[name] = decodeURIComponent(rest.join("="));
  });

  return cookies;
}
