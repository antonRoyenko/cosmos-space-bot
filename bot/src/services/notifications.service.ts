import { usersService } from "@bot/services/index";
import { Context } from "@bot/types";
import { Network } from "@prisma/client";
import { notificationDao } from "@bot/dao";

type Notification = {
  isReminderActive: boolean;
  isAlarmActive: boolean;
  updateNotification: ({
    triggerReminderActivity,
    triggerAlarmActivity,
    notificationReminderTime,
  }: {
    triggerReminderActivity?: boolean;
    triggerAlarmActivity?: boolean;
    notificationReminderTime?: string[];
  }) => Promise<void>;
};

type NetworkTime = {
  isNotificationTimeActive: (time: string) => boolean;
  updateNotificationReminderTime: (time: string) => Promise<void>;
};

export async function notificationsService({
  ctx,
}: {
  ctx?: Context;
}): Promise<Notification>;
export async function notificationsService({
  ctx,
  timeArr,
}: {
  ctx?: Context;
  timeArr?: string[];
}): Promise<NetworkTime>;
export async function notificationsService({
  ctx,
  timeArr,
}: {
  ctx?: Context;
  network?: Network;
  timeArr?: string[];
}) {
  const user = ctx?.local.user || {
    id: 0,
  };
  const notification = (await notificationDao.getNotification({
    where: {
      userId: user.id,
    },
  })) || {
    id: 0,
    isReminderActive: false,
    isAlarmActive: false,
    notificationReminderTime: [""],
  };

  const isReminderActive = notification.isReminderActive || false;
  const isAlarmActive = notification.isAlarmActive || false;

  const updateNotification = async ({
    triggerReminderActivity,
    triggerAlarmActivity,
    notificationReminderTime,
  }: {
    triggerReminderActivity?: boolean;
    triggerAlarmActivity?: boolean;
    notificationReminderTime?: string[];
  }) => {
    await notificationDao.upsertNotification({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
      },
      update: {
        isReminderActive: triggerReminderActivity
          ? !isReminderActive
          : undefined,
        isAlarmActive: triggerAlarmActivity ? !isAlarmActive : undefined,
        notificationReminderTime,
      },
    });
  };

  if (timeArr && timeArr.length > 0) {
    const notificationTime = notification.notificationReminderTime;
    const isNotificationTimeActive = (time: string) =>
      notificationTime?.includes(time);

    const updateNotificationReminderTime = async (time: string) => {
      let timeArr: string[];

      if (notificationTime?.includes(time)) {
        timeArr = notificationTime.filter((item) => item !== time);
      } else {
        timeArr = [...notificationTime, time];
      }

      await updateNotification({ notificationReminderTime: timeArr });
    };

    return {
      isNotificationTimeActive,
      updateNotificationReminderTime,
    };
  }

  return {
    isReminderActive,
    isAlarmActive,
    updateNotification,
  };
}
