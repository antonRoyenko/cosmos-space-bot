import { dailyReminderMenu } from "@bot/menu";
import { Context } from "@bot/types";
import { proposalMenu, alarmMenu } from "@bot/menu";
import { menuCreator } from "@bot/utils/menuCreator";
import { en } from "@bot/constants/en";

const menuList = [
  {
    text: en.notification.menu.reminder,
    callback: (ctx: Context) =>
      ctx.reply(en.notification.reminderMenu.title, {
        reply_markup: dailyReminderMenu,
      }),
  },
  { row: true },
  {
    text: en.notification.menu.alarm,
    callback: (ctx: Context) =>
      ctx.reply(en.notification.alarmMenu.title, {
        reply_markup: alarmMenu,
      }),
  },
  { row: true },
  {
    text: en.notification.menu.proposals,
    callback: (ctx: Context) =>
      ctx.reply(en.notification.proposalMenu.title, {
        reply_markup: proposalMenu,
      }),
  },
];

export const notificationMenu = menuCreator("notification", menuList);
