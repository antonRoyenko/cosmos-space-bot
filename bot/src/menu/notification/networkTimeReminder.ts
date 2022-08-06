import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";

const timeArr = [
  "12 a.m.",
  "3 a.m.",
  "6 a.m.",
  "9 a.m.",
  "12 p.m.",
  "3 p.m.",
  "6 p.m.",
  "9 p.m.",
];

export const networkTimeReminderMenu = new Menu("networkTimeReminder", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange();

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
