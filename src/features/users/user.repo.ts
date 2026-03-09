import prisma from "@/src/utils/prisma";

export class UserRepository {
  async getUserById(userId: number) {
    return await prisma.users.findUnique({ where: { id: userId } });
  }
  async getUserByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }

  async createUser(data: { name: string; email: string; password: string }) {
    return await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password,
      },
    });
  }
}
