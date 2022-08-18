import { Context } from "@bot/types";
import { Network } from "@prisma/client";
import { networkInNotificationDao, notificationDao } from "@bot/dao";

type Networks = {
  isNetworkActive: boolean;
  isGovActive: boolean;
  updateGovernance: (time: Date) => Promise<void>;
  updateReminder: () => Promise<void>;
};

export async function networksInNotificationService({
  ctx,
  network,
}: {
  ctx: Context;
  network: Network;
}): Promise<Networks> {
  const user = ctx.local.user || {
    id: 0,
    notificationId: 0,
  };

  const notification = (await notificationDao.getNotification({
    where: {
      userId: user.id,
    },
  })) || {
    id: 0,
    isReminderActive: false,
    notificationReminderTime: [""],
  };

  const reminderNetwork =
    await networkInNotificationDao.getNetworkInNotification({
      where: {
        reminderNetworkId: network.id,
      },
    });

  const governanceNetwork =
    await networkInNotificationDao.getNetworkInNotification({
      where: {
        governanceNetworkId: network.id,
      },
    });

  const isNetworkActive = !!reminderNetwork;
  const isGovActive = !!governanceNetwork;

  const updateGovernance = async (time: Date) => {
    if (isGovActive) {
      await networkInNotificationDao.removeNetworkInNotification({
        where: {
          governanceNetworkId: network.id,
        },
      });
    } else {
      await networkInNotificationDao.createNetworkInNotification({
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
      await networkInNotificationDao.removeNetworkInNotification({
        where: {
          reminderNetworkId: network.id,
        },
      });
    } else {
      await networkInNotificationDao.createNetworkInNotification({
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
