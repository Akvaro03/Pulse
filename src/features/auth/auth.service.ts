import { hashPassword } from "@/src/utils/password";
import { RegisterDTO } from "./auth.schema";
import { UserRepository } from "../users/user.repo";

export class AuthService {
  private users = new UserRepository();

  async register(dto: RegisterDTO) {
    // 1) Normalización (decisión senior: todo email normalizado)
    const email = dto.email.trim().toLowerCase();

    // 2) Hash password (fuera de la tx también sirve, pero ok aquí)
    const passwordHash = await hashPassword(dto.password);

    const existing = await this.users.getUserByEmail(email);

    if (existing) {
      throw new Error("User already exists");
    }

    const created = await this.users.createUser({
      name: dto.name,
      email,
      password: passwordHash,
    });
    return {
      id: created.id,
      email: created.email,
      name: created.name,
      createdAt: created.created_at,
    };
  }
}
