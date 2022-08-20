import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  upsertAlarm: (args: Prisma.AlarmUpsertArgs) => {
    console.log(98, args);
    return prisma.alarm.upsert(args);
  },

  getAlarm: (args: Prisma.AlarmFindUniqueArgs) => prisma.alarm.findUnique(args),

  getAllAlarms: (args?: Prisma.AlarmFindManyArgs) =>
    prisma.alarm.findMany(args),
});
