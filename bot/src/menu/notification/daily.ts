import { Menu } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { networksReminderMenu } from "./networksReminder";
import { networkTimeReminderMenu } from "./networkTimeReminder";

export const reminderDailyMenu = new Menu("dailyReminder")
  .text("Choose network", (ctx) =>
    ctx.reply("Choose 234", { reply_markup: networksReminderMenu })
  )
  .row()
  .text("Choose Time", (ctx) =>
    ctx.reply("Choose 234123", { reply_markup: networkTimeReminderMenu })
  )
  .row()
  .text(
    async (ctx) => {
      const user = await usersService.getUserByTelegramId(
        Number(ctx?.from?.id)
      );
      const notification = await usersService.getUserNotification(
        Number(user?.notificationId)
      );

      return notification?.isReminderActive ? "Enabled 🔔" : "Disabled 🔕";
    },
    async (ctx) => {
      const user = await usersService.getUserByTelegramId(
        Number(ctx?.from?.id)
      );
      const notification = await usersService.getUserNotification(
        Number(user?.notificationId)
      );
      await usersService.upsertByTelegramId(Number(ctx?.from?.id), {
        update: {
          notification: {
            update: {
              isReminderActive: !notification?.isReminderActive,
            },
          },
        },
      });

      ctx.menu.update();
    }
  )
  .row()
  .back("Go back");
