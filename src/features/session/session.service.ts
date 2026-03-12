import { users } from "@/src/generated/prisma/client";
import { hashPassword } from "@/src/utils/password";
import { SessionRepository } from "./session.repo";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class SessionService {
  private sessions = new SessionRepository();
  async findById(sessionId: number) {
    return this.sessions.findById({ sessionId });
  }
  async createSession(user: users) {
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_SECRET as string,
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = crypto.randomUUID();
    const refreshHash = await hashPassword(refreshToken);
    const session = await this.sessions.createSession({
      id: user.id,
      expires_at: addDays(new Date(), 30),
      refresh_token_hash: refreshHash,
    });
    return {
      accessToken,
      refreshToken: `${session.id}.${refreshToken}`,
    };
  }
}
function addDays(date: Date, days: number) {
  const newDate = new Date(date); // Create a copy to avoid mutation
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
