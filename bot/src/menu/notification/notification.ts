import { dailyReminderMenu } from "@bot/menu";
import { alarmMenu } from "./alarm";
import { Context } from "@bot/types";
import { proposalMenu } from "@bot/menu/notification/proposal";
import { menuCreator } from "@bot/utils/menuCreator";

const menuList = [
  {
    text: "Daily reminder",
    callback: (ctx: Context) =>
      ctx.reply("Choose 123", { reply_markup: dailyReminderMenu }),
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
        reply_markup: proposalMenu,
      }),
  },
];

export const notificationMenu = menuCreator("notification", menuList);
