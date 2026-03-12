import prisma from "@/src/utils/prisma";

export class SessionRepository {
  async findById(data: { sessionId: number }) {
    return prisma.sessions.findFirst({
      where: {
        expires_at: { gt: new Date() },
        id: data.sessionId,
      },
    });
  }
  async deleteSessionsByUserId(data: { user_id: number }) {
    return prisma.sessions.deleteMany({
      where: {
        user_id: data.user_id,
      },
    });
  }
  async createSession(data: {
    id: number;
    refresh_token_hash: string;
    expires_at: Date;
  }) {
    return prisma.sessions.create({
      data: {
        refresh_token_hash: data.refresh_token_hash,
        expires_at: data.expires_at,
        user_id: data.id,
      },
    });
  }
}
