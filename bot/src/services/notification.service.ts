import { usersService } from "@bot/services/index";
import { Context } from "@bot/types";
import { Network } from "@prisma/client";

type Notification = {
  isReminderActive: boolean;
  updateNotification: ({
    reminderToggle,
  }: {
    reminderToggle?: boolean;
  }) => Promise<void>;
};

type Networks = {
  isNetworkActive: boolean;
  updateNetwork: (isGov?: boolean) => Promise<void>;
  isGovActive: boolean;
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
  }: {
    reminderToggle?: boolean;
  }) => {
    await usersService.upsertUserNotification(Number(notification?.id), {
      ...(Boolean(reminderToggle) && {
        isReminderActive: !isReminderActive,
      }),
    });
  };

  if (network) {
    const isNetworkActive =
      notification?.reminderNetworks.some(
        (reminderNetwork) => reminderNetwork.id === network.id
      ) || false;
    const isGovActive =
      notification?.governanceNetworks.some(
        (govNetwork) => govNetwork.id === network.id
      ) || false;

    const updateNetwork = async (isGov = false) => {
      const reminderArr = notification?.reminderNetworks || [];
      const govArr = notification?.governanceNetworks || [];

      const isReminderArrIncludeNetwork = reminderArr.some(
        (reminderNetwork) => reminderNetwork.id === network.id
      );
      const isGovArrIncludeNetwork = govArr.some(
        (govNetwork) => govNetwork.id === network.id
      );

      if (isReminderArrIncludeNetwork || isGovArrIncludeNetwork) {
        const deleteItem = !isGov
          ? {
              reminderNetwork: {
                id: network.id,
              },
            }
          : {
              governanceNetwork: {
                id: network.id,
              },
            };
        console.log(2, user.notificationId, deleteItem);

        await usersService.removeUserNotification(
          user.notificationId,
          deleteItem
        );
      } else {
        const reminderNetworksIds = [
          ...reminderArr.map((network) => ({ id: network.id })),
          { id: network.id },
        ];
        const govNetworksIds = [
          ...govArr.map((network) => ({ id: network.id })),
          { id: network.id },
        ];
        const updatedItems = !isGov
          ? { networks: reminderNetworksIds }
          : { governanceNetworks: govNetworksIds };

        await usersService.upsertUserNotification(
          Number(notification?.id),
          updatedItems
        );
      }
    };

    return {
      isNetworkActive,
      updateNetwork,
      isGovActive,
    };
  }

  if (timeArr && timeArr.length > 0) {
    const notificationTime = notification?.notificationReminderTime || [];
    const isNotificationTimeActive = (time: string) =>
      notificationTime?.includes(time);

    const updateNotificationReminderTime = async (time: string) => {
      let arr: string[];

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
