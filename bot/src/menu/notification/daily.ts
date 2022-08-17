import { Menu } from "@grammyjs/menu";
import { notificationService } from "@bot/services";
import { networksReminderMenu } from "./reminder";
import { networkTimeReminderMenu } from "./reminderTime";
import { Context } from "@bot/types";

export const reminderDailyMenu = new Menu<Context>("dailyReminder")
  .text("Choose network", (ctx) =>
    ctx.reply("Choose 234", { reply_markup: networksReminderMenu })
  )
  .row()
  .text("Choose Time", (ctx) =>
    ctx.reply("Choose Time", { reply_markup: networkTimeReminderMenu })
  )
  .row()
  .text("Choose Timezone", (ctx) => {
    ctx.session.step = "timezone";
    return ctx.reply("Write your country for timezone detection");
  })
  .row()
  .text(
    async (ctx) => {
      const { isReminderActive } = await notificationService({ ctx });

      return isReminderActive ? "Enabled 🔔" : "Disabled 🔕";
    },
    async (ctx) => {
      const { updateNotification } = await notificationService({ ctx });
      await updateNotification();

      ctx.menu.update();
    }
  )
  .row()
  .back("Go back");
