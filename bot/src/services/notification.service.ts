import { usersService } from "@bot/services/index";
import { Context } from "@bot/types";
import { Network } from "@prisma/client";

type Notification = {
  isReminderActive: boolean;
  updateNotification: ({
    reminderToggle,
    timezone,
  }: {
    reminderToggle?: boolean;
    timezone?: string;
  }) => Promise<void>;
};

type Networks = {
  isNetworkActive: boolean;
  updateNetwork: () => Promise<void>;
};

type NetworkTime = {
  isNotificationTimeActive: (time: string) => boolean;
  updateNotificationReminderTime: (time: string) => Promise<void>;
};

export async function createService({
  ctx,
}: {
  ctx: Context;
}): Promise<Notification>;
export async function createService({
  ctx,
  network,
}: {
  ctx: Context;
  network: Network;
}): Promise<Networks>;
export async function createService({
  ctx,
  timeArr,
}: {
  ctx: Context;
  timeArr: string[];
}): Promise<NetworkTime>;
export async function createService({
  ctx,
  network,
  timeArr,
}: {
  ctx: Context;
  network?: Network;
  timeArr?: string[];
}) {
  const user = ctx.local.user || {
    notificationId: 0,
    telegramId: 0,
  };
  const notification = await usersService.getUserNotification(
    user.notificationId
  );

  const isReminderActive = notification?.isReminderActive || false;

  const updateNotification = async ({
    reminderToggle,
    timezone,
  }: {
    reminderToggle?: boolean;
    timezone?: string;
  }) => {
    await usersService.upsertUserNotification(Number(notification?.id), {
      ...(Boolean(reminderToggle) && {
        isReminderActive: !isReminderActive,
      }),
      ...(timezone && {
        timezone,
      }),
    });
  };

  if (network) {
    const isNetworkActive =
      notification?.reminderNetworksIds.some(
        (reminderNetwork) => reminderNetwork.id === network.id
      ) || false;

    const updateNetwork = async () => {
      const reminderArr = notification?.reminderNetworksIds || [];
      const isReminderArrIncludeNetwork = reminderArr.some(
        (reminderNetwork) => reminderNetwork.id === network.id
      );

      if (isReminderArrIncludeNetwork) {
        await usersService.removeUserNotification(user.notificationId, {
          id: network.id,
        });
      } else {
        const reminderNetworksIds = [
          ...reminderArr.map((network) => ({ id: network.id })),
          { id: network.id },
        ];

        await usersService.upsertUserNotification(Number(notification?.id), {
          networks: reminderNetworksIds,
        });
      }
    };

    return {
      isNetworkActive,
      updateNetwork,
    };
  }

  if (timeArr && timeArr.length > 0) {
    const notificationTime = notification?.notificationReminderTime || [];
    const isNotificationTimeActive = (time: string) =>
      notificationTime?.includes(time);

    const updateNotificationReminderTime = async (time: string) => {
      let arr: string[] = [];

      if (notificationTime?.includes(time)) {
        arr = notificationTime.filter((item) => item !== time);
      } else {
        arr = [...notificationTime, time];
      }

      await usersService.upsertUserNotification(user.notificationId, {
        notificationReminderTime: arr,
      });
    };

    return {
      isNotificationTimeActive,
      updateNotificationReminderTime,
    };
  }

  return {
    isReminderActive,
    updateNotification,
  };
}
