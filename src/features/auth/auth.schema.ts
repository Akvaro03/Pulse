import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(100),
  name: z.string().min(2).max(80),
});

export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(100),
});

export type LoginDTO = z.infer<typeof loginSchema>;

export const logoutSchema = z.object({
  userId: z.number(),
});

export type LogoutDTO = z.infer<typeof logoutSchema>;