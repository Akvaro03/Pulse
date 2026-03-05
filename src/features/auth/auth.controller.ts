import { registerSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

const auth = new AuthService();

export async function registerHandler(input: unknown) {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { status: 400, body: { error: "INVALID_BODY", details: parsed.error } };
  }
  
  try {
    const user = await auth.register(parsed.data);
    return { status: 201, body: { user } };
  } catch (e: unknown) {
    // narrow the error to an object with an optional code string
    const err = e as { code?: string };
    if (err.code === "EMAIL_ALREADY_EXISTS") {
      return { status: 409, body: { error: "EMAIL_ALREADY_EXISTS" } };
    }
    return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}