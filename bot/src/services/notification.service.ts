import { usersService } from "@bot/services/index";
import { Context } from "@bot/types";
import { Network } from "@prisma/client";

type Notification = {
  isReminderActive: boolean;
  updateNotification: () => Promise<void>;
};

type Networks = {
  isNetworkActive: boolean;
  isGovActive: boolean;
  updateGovernance: (time?: Date) => Promise<void>;
  updateReminder: () => Promise<void>;
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
    id: 0,
    notificationId: 0,
    telegramId: 0,
  };
  const notification = (await usersService.getUserNotification(user.id)) || {
    id: 0,
    isReminderActive: false,
    notificationReminderTime: [""],
  };

  const isReminderActive = notification.isReminderActive || false;

  const updateNotification = async () => {
    await usersService.upsertUserNotification(user.id, {
      isReminderActive: !isReminderActive,
    });
  };

  if (network) {
    const reminderNetwork = await usersService.getNetworkInNotification({
      where: {
        reminderNetworkId: network.id,
      },
    });
    const governanceNetwork = await usersService.getNetworkInNotification({
      where: {
        governanceNetworkId: network.id,
      },
    });
    const isNetworkActive = !!reminderNetwork;
    const isGovActive = !!governanceNetwork;

    const updateGovernance = async (time: Date) => {
      if (isGovActive) {
        await usersService.removeNetworkInNotification({
          where: {
            governanceNetworkId: network.id,
          },
        });
      } else {
        await usersService.createNetworkInNotification({
          data: {
            notificationId: notification.id,
            governanceNetworkId: network.id,
            governanceTimeStart: time,
          },
        });
      }
    };

    const updateReminder = async () => {
      if (isNetworkActive) {
        await usersService.removeNetworkInNotification({
          where: {
            reminderNetworkId: network.id,
          },
        });
      } else {
        await usersService.createNetworkInNotification({
          data: {
            notificationId: notification.id,
            reminderNetworkId: network.id,
          },
        });
      }
    };

    return {
      isNetworkActive,
      isGovActive,
      updateGovernance,
      updateReminder,
    };
  }

  if (timeArr && timeArr.length > 0) {
    const notificationTime = notification.notificationReminderTime;
    const isNotificationTimeActive = (time: string) =>
      notificationTime?.includes(time);

    const updateNotificationReminderTime = async (time: string) => {
      let arr: string[];

      if (notificationTime?.includes(time)) {
        arr = notificationTime.filter((item) => item !== time);
      } else {
        arr = [...notificationTime, time];
      }

      await usersService.upsertUserNotification(user.id, {
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
