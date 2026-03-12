import { hashPassword, verifyPassword } from "@/src/utils/password";
import { LoginDTO, RegisterDTO } from "./auth.schema";
import { UserRepository } from "../users/user.repo";

export class AuthService {
  private users = new UserRepository();

  async register(dto: RegisterDTO) {
    // 1) Normalización (decisión senior: todo email normalizado)
    const email = dto.email.trim().toLowerCase();

    const existing = await this.users.getUserByEmail(email);

    // 2) Hash password (fuera de la tx también sirve, pero ok aquí)
    const passwordHash = await hashPassword(dto.password);

    if (existing) {
      throw new Error("User already exists");
    }

    const created = await this.users.createUser({
      name: dto.name,
      email,
      password: passwordHash,
    });

    return created;
  }

  async login(dto: LoginDTO) {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.users.getUserByEmail(email);
    if (!existing) {
      throw new Error("User doesn't exist");
    }
    const isThePassword = verifyPassword(existing?.password_hash, dto.password);
    
    if (!isThePassword) {
      throw new Error("Password doesn't match");
    }

    return existing
  }
}
