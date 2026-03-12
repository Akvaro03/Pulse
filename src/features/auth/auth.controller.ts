import { loginSchema, logoutSchema, registerSchema } from "./auth.schema";
import createHeaderSession from "../session/createHeaderSession";
import { refreshSessionSchema } from "../plans/plans.schema";
import { SessionService } from "../session/session.service";
import { verifyPassword } from "@/src/utils/password";
import { AuthService } from "./auth.service";
import jwt from "jsonwebtoken";

const auth = new AuthService();
const session = new SessionService();

export async function registerHandler(input: unknown) {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await auth.register(parsed.data);
    const { accessToken, refreshToken } = await session.createSession(user);

    const headers = createHeaderSession(accessToken, refreshToken);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return { status: 409, body: { error: "EMAIL_ALREADY_EXISTS" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
export async function logoutHandler(input: unknown) {
  const parsed = logoutSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    return await auth.logout(parsed.data);
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return { status: 409, body: { error: "EMAIL_ALREADY_EXISTS" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
export async function loginHandler(input: unknown) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: "INVALID_BODY", details: parsed.error },
    };
  }

  try {
    const user = await auth.login(parsed.data);
    const { accessToken, refreshToken } = await session.createSession(user);

    const headers = createHeaderSession(accessToken, refreshToken);

    console.log(headers);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "User doesn't exist") {
      return { status: 409, body: { error: "User doesn't exist" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
export async function refreshSessionHandler(input: unknown) {
  const parsed = refreshSessionSchema.safeParse({ refreshToken: input });
  if (!parsed.success) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const [sessionId, refreshToken] = parsed.data.refreshToken.split(".");

    const sessionFound = await session.findById(Number(sessionId));
    const valid = await verifyPassword(
      sessionFound?.refresh_token_hash || "",
      refreshToken,
    );
    if (!valid) {
      return new Response("Unauthorized", { status: 401 });
    }
    const accessToken = jwt.sign(
      { userId: sessionFound?.user_id },
      process.env.ACCESS_SECRET!,
      { expiresIn: "15m" },
    );

    const res = new Response(JSON.stringify({ success: true }));

    res.headers.append(
      "Set-Cookie",
      `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=900`,
    );
    return res;
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "User doesn't exist") {
      return { status: 409, body: { error: "User doesn't exist" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}
