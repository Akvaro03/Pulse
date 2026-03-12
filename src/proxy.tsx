import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  if (accessToken && refreshToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!accessToken && !refreshToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const payload = jwt.verify(
      accessToken!,
      process.env.ACCESS_SECRET as string,
    ) as { userId: number };

    const headers = new Headers(request.headers);
    headers.set("x-user-id", payload.userId.toString());

    return NextResponse.next({
      request: { headers },
    });
  } catch {
    if (!refreshToken && !isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!refreshToken && isLoginPage) {
      return NextResponse.next();
    }

    // llamar endpoint de refresh
    const refreshResponse = await fetch(
      `${request.nextUrl.origin}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    );
    const response = NextResponse.next();
    const setCookie = refreshResponse.headers.get("set-cookie");

    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/api/plan",
    "/api/day/today",
    "/api/plan/addPlan",
    "/api/auth/logout",
  ],
};
