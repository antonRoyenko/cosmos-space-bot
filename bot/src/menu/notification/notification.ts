import { reminderDailyMenu } from "./dailyReminder";
import { alarmMenu } from "./alarm";
import { Context } from "@bot/types";
import { governanceMenu } from "@bot/menu/notification/governance";
import { menuCreator } from "@bot/utils/menuCreator";

const menuList = [
  {
    text: "Daily reminder",
    callback: (ctx: Context) =>
      ctx.reply("Choose 123", { reply_markup: reminderDailyMenu }),
  },
  { row: true },
  {
    text: "Price alarm",
    callback: (ctx: Context) =>
      ctx.reply("Choose 123", { reply_markup: alarmMenu }),
  },
  { row: true },
  {
    text: "Governance",
    callback: (ctx: Context) =>
      ctx.reply("Choose governance network(s)", {
        reply_markup: governanceMenu,
      }),
  },
];

export const notificationMenu = menuCreator("notification", menuList);
