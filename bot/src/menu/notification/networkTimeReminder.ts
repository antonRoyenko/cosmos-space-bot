import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";

const timeArr = [
  "12:00 AM",
  "3:00 AM",
  "6:00 AM",
  "9:00 AM",
  "12:00 PM",
  "3:00 PM",
  "6:00 PM",
  "9:00 PM",
];

export const networkTimeReminderMenu = new Menu<Context>(
  "networkTimeReminder",
  {
    autoAnswer: false,
  }
).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    for (let i = 0; i < timeArr.length; i++) {
      const time = timeArr[i];

      range.text(
        async (ctx) => {
          const user = await usersService.getUserByTelegramId(
            Number(ctx?.from?.id)
          );
          if (user?.notificationId) {
            const notification = await usersService.getUserNotification(
              user.notificationId
            );

            const notificationTime = notification?.notificationReminderTime;

            return notificationTime?.includes(time)
              ? `${time} ✅`
              : `${time} ❎`;
          }

          return "";
        },
        async (ctx) => {
          const user = await usersService.getUserByTelegramId(
            Number(ctx?.from?.id)
          );

          if (user?.notificationId) {
            let arr: string[] = [];
            const notification = await usersService.getUserNotification(
              user.notificationId
            );
            const notificationTime =
              notification?.notificationReminderTime || [];
            if (notificationTime?.includes(time)) {
              arr = notificationTime.filter((item) => item !== time);
            } else {
              arr = [...notificationTime, time];
            }

            await usersService.upsertUserNotification(user.notificationId, {
              notificationReminderTime: arr,
            });
          }

          ctx.menu.update();
        }
      );

      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }
  range.row().back("Go back");

  return range;
});
