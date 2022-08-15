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
      wallet: string,
      args?: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>
    ) => {
      const query: Prisma.WalletUpsertArgs = {
        where: {
          userId: id,
        },
        create: {
          userId: id,
          networkId,
          wallet,
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
          id,
        },
        include: {
          reminderNetworks: true,
          governanceNetworks: true,
        },
      }),

    removeUserNotification: (
      id: number,
      {
        reminderNetwork = {},
        governanceNetwork = {},
      }: {
        reminderNetwork?: { id: number } | Record<string, never>;
        governanceNetwork?: { id: number } | Record<string, never>;
      }
    ) =>
      prisma.notification.update({
        where: {
          id,
        },
        data: {
          ...(!_.isEmpty(reminderNetwork) && {
            reminderNetworks: {
              disconnect: [reminderNetwork],
            },
          }),
          ...(!_.isEmpty(governanceNetwork) && {
            governanceNetworks: {
              disconnect: [governanceNetwork],
            },
          }),
        },
      }),

    upsertUserNotification: (
      id: number,
      {
        networks,
        isReminderActive,
        notificationReminderTime,
        governanceNetworks,
      }: {
        networks?: { id: number }[];
        isReminderActive?: boolean;
        notificationReminderTime?: string[];
        timezone?: string;
        governanceNetworks?: { id: number }[];
      }
    ) => {
      const query: Prisma.NotificationUpsertArgs = {
        where: {
          id,
        },
        create: {
          id,
        },
        update: {
          reminderNetworks: {
            connect: networks,
          },
          governanceNetworks: {
            connect: governanceNetworks,
          },
          isReminderActive,
          notificationReminderTime,
        },
      };

      return prisma.notification.upsert(query);
    },

    getAlarm: (userId: number) =>
      prisma.alarm.findUnique({
        where: {
          userId,
        },
      }),

    getAlarms: () => prisma.alarm.findMany(),

    upsertAlarm: ({
      userId,
      isAlarmActive,
    }: {
      isAlarmActive?: boolean;
      userId: number;
    }) => {
      const query: Prisma.AlarmUpsertArgs = {
        where: {
          userId,
        },
        create: {
          userId,
        },
        update: {
          isAlarmActive: isAlarmActive,
        },
      };

      return prisma.alarm.upsert(query);
    },

    getAlarmNetworks: (alarmId: number) =>
      prisma.alarmNetwork.findMany({
        where: {
          alarmId,
        },
      }),

    getAlarmNetwork: (networkId?: number) =>
      prisma.alarmNetwork.findUnique({
        where: {
          networkId,
        },
      }),

    upsertAlarmNetwork: ({
      networkId,
      alarmPrices,
      alarmId,
    }: {
      networkId: number;
      alarmPrices: string[];
      alarmId: number;
    }) => {
      const query: Prisma.AlarmNetworkUpsertArgs = {
        where: {
          networkId,
        },
        create: {
          networkId,
          alarmPrices,
          alarmId,
        },
        update: {
          alarmPrices,
        },
      };

      return prisma.alarmNetwork.upsert(query);
    },

    removeAlarmPrice: (id: number, prices: string[]) =>
      prisma.alarmNetwork.update({
        where: {
          id,
        },
        data: {
          alarmPrices: prices,
        },
      }),
  });
