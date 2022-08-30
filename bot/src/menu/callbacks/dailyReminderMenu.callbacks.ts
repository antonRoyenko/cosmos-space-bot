import { Context } from "@bot/types";
import { networksReminderMenu } from "@bot/menu/notification/networksReminder.menu";
import { networkTimeReminderMenu } from "@bot/menu/notification/timeReminder.menu";
import { notificationsService } from "@bot/services";
import { MenuFlavor } from "@grammyjs/menu";

export async function chooseNetworkCallback(ctx: Context) {
  await ctx.reply("Please, choose network", {
    reply_markup: networksReminderMenu,
  });
}

export async function chooseTimeCallback(ctx: Context) {
  await ctx.reply("Please, choose alarm time", {
    reply_markup: networkTimeReminderMenu,
  });
}

export async function chooseTimezoneCallback(ctx: Context) {
  ctx.session.step = "timezone";
  await ctx.reply("Fill in the country to detect your timezone");
}

export async function isReminderActiveText(ctx: Context) {
  const { isReminderActive } = await notificationsService({ ctx });

  return isReminderActive ? " 🔔 Enabled" : "🔕 Disabled";
}

export async function toggleReminderActivity(ctx: Context & MenuFlavor) {
  const { updateNotification } = await notificationsService({ ctx });
  await updateNotification({ triggerReminderActivity: true });

  ctx.menu.update();
}
