import _ from "lodash";
import { Prisma, PrismaClient } from "@prisma/client";
import { DeepPartial } from "@bot/types";

export const createService = (prisma: PrismaClient) =>
  Object.assign(prisma.user, {
    upsertByTelegramId: <T extends DeepPartial<Prisma.UserUpsertArgs>>(
      telegramId: number,
      args?: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>
    ) => {
      const query: Prisma.UserUpsertArgs = {
        where: {
          telegramId,
        },
        create: {
          telegramId,
          networkId: undefined,
          notification: { create: {} },
        },
        update: {},
      };

      return prisma.user.upsert(_.merge(query, args));
    },

    upsertWallet: <T extends DeepPartial<Prisma.WalletUpsertArgs>>(
      id: number,
      networkId: number,
      address: string,
      args?: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>
    ) => {
      const query: Prisma.WalletUpsertArgs = {
        where: {
          userId: id,
        },
        create: {
          userId: id,
          networkId,
          address,
        },
        update: {},
      };

      return prisma.wallet.upsert(_.merge(query, args));
    },

    removeWallet: (id: number) =>
      prisma.wallet.delete({
        where: {
          id,
        },
      }),

    updateByTelegramId: <T extends DeepPartial<Prisma.UserUpdateArgs>>(
      telegramId: number,
      args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
    ) => {
      const query: Prisma.UserUpdateArgs = {
        where: {
          telegramId,
        },
        data: {},
      };

      return prisma.user.update(_.merge(query, args));
    },

    getResourcesById: (networkId: number) =>
      prisma.resource.findUnique({
        where: {
          id: networkId,
        },
      }),

    getNetwork: ({
      id,
      name,
      resourceId,
    }: {
      id?: number;
      name?: string;
      resourceId?: number;
    }) =>
      prisma.network.findUnique({
        where: {
          id,
          name,
          resourceId,
        },
      }),

    getNetworks: () => prisma.network.findMany(),

    getUserByTelegramId: ({
      telegramId,
      id,
    }: {
      telegramId?: number;
      id?: number;
    }) =>
      prisma.user.findUnique({
        where: {
          telegramId,
          id,
        },
      }),

    getUsers: () => prisma.user.findMany(),

    getUserWallets: (telegramId: number) =>
      prisma.wallet.findMany({
        where: {
          userId: telegramId,
        },
      }),

    getUserNotification: (id: number) =>
      prisma.notification.findUnique({
        where: {
          userId: id,
        },
      }),

    getAllNotifications: () => prisma.notification.findMany(),

    upsertUserNotification: (
      id: number,
      {
        isReminderActive,
        notificationReminderTime,
      }: {
        networks?: { id: number }[];
        isReminderActive?: boolean;
        notificationReminderTime?: string[];
        timezone?: string;
      }
    ) => {
      const query: Prisma.NotificationUpsertArgs = {
        where: {
          userId: id,
        },
        create: {
          userId: id,
        },
        update: {
          isReminderActive,
          notificationReminderTime,
        },
      };

      return prisma.notification.upsert(query);
    },

    getAlarm: ({
      userId,
      networkId,
    }: {
      userId?: number;
      networkId?: number;
    }) =>
      prisma.alarm.findUnique({
        where: {
          userId,
          networkId,
        },
      }),

    getAllAlarms: (args?: Prisma.AlarmFindManyArgs) =>
      prisma.alarm.findMany(args),

    getNetworkInNotification: (
      args: Prisma.NetworksInNotificationFindUniqueArgsBase
    ) => prisma.networksInNotification.findUnique(args),

    getAllNetworkInNotification: (
      args: Prisma.NetworksInNotificationFindManyArgs
    ) => prisma.networksInNotification.findMany(args),

    createNetworkInNotification: (
      args: Prisma.NetworksInNotificationCreateArgs
    ) => prisma.networksInNotification.create(args),

    removeNetworkInNotification: (
      args: Prisma.NetworksInNotificationDeleteArgs
    ) => prisma.networksInNotification.delete(args),

    upsertAlarm: ({
      userId,
      networkId,
      alarmPrices,
    }: {
      userId: number;
      networkId: number;
      alarmPrices?: string[];
    }) => {
      const query: Prisma.AlarmUpsertArgs = {
        where: {
          userId,
        },
        create: {
          userId,
          networkId,
        },
        update: {
          alarmPrices,
        },
      };

      return prisma.alarm.upsert(query);
    },

    removeAlarmPrice: (id: number, prices: string[]) =>
      prisma.alarm.update({
        where: {
          id,
        },
        data: {
          alarmPrices: prices,
        },
      }),
  });
