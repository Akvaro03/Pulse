import { hashPassword } from "@/src/utils/password";
import { RegisterDTO } from "./auth.schema";

export class AuthService {
  async register(dto: RegisterDTO) {
    // 1) Normalización (decisión senior: todo email normalizado)
    const email = dto.email.trim().toLowerCase();

    // 2) Hash password (fuera de la tx también sirve, pero ok aquí)
    const passwordHash = await hashPassword(dto.password);
  }
}
