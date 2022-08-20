import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  upsertUser: (args: Prisma.UserUpsertArgs) => prisma.user.upsert(args),

  updateUser: (args: Prisma.UserUpdateArgs) => prisma.user.update(args),

  getUser: (args: Prisma.UserFindUniqueArgs) => prisma.user.findUnique(args),

  getAllUser: () => prisma.user.findMany(),

  count: () => prisma.user.count(),
});
