import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  createAlarmPrice: (args: Prisma.AlarmPriceCreateArgs) =>
    prisma.alarmPrice.create(args),

  getAlarmPrice: (args: Prisma.AlarmPriceFindUniqueArgs) =>
    prisma.alarmPrice.findUnique(args),

  getAllAlarmPrices: (args: Prisma.AlarmPriceFindManyArgs) =>
    prisma.alarmPrice.findMany(args),

  removeAlarmPrice: (args: Prisma.AlarmPriceDeleteArgs) =>
    prisma.alarmPrice.delete(args),
});
