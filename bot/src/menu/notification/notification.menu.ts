import { dailyReminderMenu } from "@bot/menu";
import { Context } from "@bot/types";
import { proposalMenu, alarmMenu } from "@bot/menu";
import { menuCreator } from "@bot/utils/menuCreator";

const menuList = [
  {
    text: "🗓 Set Up Daily Report Reminders",
    callback: (ctx: Context) =>
      ctx.reply("Choose the action", { reply_markup: dailyReminderMenu }),
  },
  { row: true },
  {
    text: "⏰ Crypto price alert",
    callback: (ctx: Context) =>
      ctx.reply("Choose the action", { reply_markup: alarmMenu }),
  },
  { row: true },
  {
    text: "📝 Proposals",
    callback: (ctx: Context) =>
      ctx.reply("Choose the network(s)", {
        reply_markup: proposalMenu,
      }),
  },
];

export const notificationMenu = menuCreator("notification", menuList);
