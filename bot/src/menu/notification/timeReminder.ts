import { Menu, MenuRange } from "@grammyjs/menu";
import { notificationsService } from "@bot/services";
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

  for (let i = 0; i < timeArr.length; i++) {
    const time = timeArr[i];

    const { isNotificationTimeActive, updateNotificationReminderTime } =
      await notificationsService({
        ctx,
        timeArr,
      });
    const isActive = isNotificationTimeActive(time);

    range.text(isActive ? `${time} ✅` : `${time} ❎`, async (ctx) => {
      await updateNotificationReminderTime(time);
      ctx.menu.update();
    });

    if ((i + 1) % 2 == 0) {
      range.row();
    }
  }
  range.row().back("Go back");

  return range;
});
