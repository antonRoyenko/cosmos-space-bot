import { Context } from "@bot/types";
import { networksReminderMenu } from "@bot/menu/notification/networksReminder";
import { networkTimeReminderMenu } from "@bot/menu/notification/timeReminder";
import { notificationsService } from "@bot/services";
import { MenuFlavor } from "@grammyjs/menu";

export async function chooseNetworkCallback(ctx: Context) {
  await ctx.reply("Choose 234", { reply_markup: networksReminderMenu });
}

export async function chooseTimeCallback(ctx: Context) {
  await ctx.reply("Choose Time", { reply_markup: networkTimeReminderMenu });
}

export async function chooseTimezoneCallback(ctx: Context) {
  ctx.session.step = "timezone";
  await ctx.reply("Write your country for timezone detection");
}

export async function isReminderActiveText(ctx: Context) {
  const { isReminderActive } = await notificationsService({ ctx });

  return isReminderActive ? "Enabled 🔔" : "Disabled 🔕";
}

export async function toggleReminderActivity(ctx: Context & MenuFlavor) {
  const { updateNotification } = await notificationsService({ ctx });
  await updateNotification({ triggerReminderActivity: true });

  ctx.menu.update();
}
