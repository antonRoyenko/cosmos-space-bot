import { Context } from "@bot/types";
import { networksReminderMenu } from "@bot/menu/notification/networksReminder.menu";
import { networkTimeReminderMenu } from "@bot/menu/notification/timeReminder.menu";
import { notificationsService } from "@bot/services";
import { MenuFlavor } from "@grammyjs/menu";
import { en } from "@bot/constants/en";

export async function chooseNetworkCallback(ctx: Context) {
  await ctx.reply(en.notification.reminderMenu.chooseNetwork, {
    reply_markup: networksReminderMenu,
  });
}

export async function chooseTimeCallback(ctx: Context) {
  await ctx.reply(en.notification.reminderMenu.chooseReminderTime, {
    reply_markup: networkTimeReminderMenu,
  });
}

export async function chooseTimezoneCallback(ctx: Context) {
  ctx.session.step = "timezone";
  await ctx.reply(en.notification.reminderMenu.fillCountry);
}

export async function isReminderActiveText(ctx: Context) {
  const { isReminderActive } = await notificationsService({ ctx });

  return isReminderActive
    ? en.notification.reminderMenu.enabled
    : en.notification.reminderMenu.disabled;
}

export async function toggleReminderActivity(ctx: Context & MenuFlavor) {
  const { updateNotification } = await notificationsService({ ctx });
  await updateNotification({ triggerReminderActivity: true });

  ctx.menu.update();
}
