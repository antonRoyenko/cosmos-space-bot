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

    getUserByTelegramId: (telegramId: number) =>
      prisma.user.findUnique({
        where: {
          telegramId,
        },
      }),

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
          reminderNetworksIds: true,
        },
      }),

    removeUserNotification: (id: number, ids: { id: number }) =>
      prisma.notification.update({
        where: {
          id,
        },
        data: {
          reminderNetworksIds: {
            disconnect: [ids],
          },
        },
      }),

    upsertUserNotification: (
      id: number,
      {
        networks,
        isReminderActive,
        notificationReminderTime,
      }: {
        networks?: { id: number }[];
        isReminderActive?: boolean;
        notificationReminderTime?: string[];
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
          reminderNetworksIds: {
            connect: networks,
          },
          isReminderActive,
          notificationReminderTime,
        },
      };

      return prisma.notification.upsert(query);
    },
  });
