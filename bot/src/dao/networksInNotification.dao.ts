import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  createNetworkInNotification: (
    args: Prisma.NetworksInNotificationCreateArgs
  ) => prisma.networksInNotification.create(args),

  getNetworkInNotification: (
    args: Prisma.NetworksInNotificationFindUniqueArgsBase
  ) => prisma.networksInNotification.findUnique(args),

  getAllNetworkInNotification: (
    args: Prisma.NetworksInNotificationFindManyArgs
  ) => prisma.networksInNotification.findMany(args),

  removeNetworkInNotification: (
    args: Prisma.NetworksInNotificationDeleteArgs
  ) => prisma.networksInNotification.delete(args),
});
