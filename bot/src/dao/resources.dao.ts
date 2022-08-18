import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  getResource: (args: Prisma.ResourceFindUniqueArgs) =>
    prisma.resource.findUnique(args),
});
