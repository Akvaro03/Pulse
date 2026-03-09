import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(100),
  name: z.string().min(2).max(80),
});

export type RegisterDTO = z.infer<typeof registerSchema>;