import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  createAlarm: (args: Prisma.AlarmCreateArgs) => prisma.alarm.create(args),

  updateAlarm: (args: Prisma.AlarmUpdateArgs) => prisma.alarm.update(args),

  getAlarm: (args: Prisma.AlarmFindUniqueArgs) => prisma.alarm.findUnique(args),

  getAllAlarms: (args?: Prisma.AlarmFindManyArgs) =>
    prisma.alarm.findMany(args),
});
