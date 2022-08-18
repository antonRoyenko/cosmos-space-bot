import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  getNetwork: (args: Prisma.NetworkFindUniqueArgs) =>
    prisma.network.findUnique(args),

  getAllNetworks: () => prisma.network.findMany(),
});
