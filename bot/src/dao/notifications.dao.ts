import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  upsertNotification: (args: Prisma.NotificationUpsertArgs) =>
    prisma.notification.upsert(args),

  getNotification: (args: Prisma.NotificationFindUniqueArgs) =>
    prisma.notification.findUnique(args),

  getAllNotifications: () => prisma.notification.findMany(),
});
