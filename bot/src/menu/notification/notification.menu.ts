import { dailyReminderMenu } from "@bot/menu";
import { Context } from "@bot/types";
import { proposalMenu, alarmMenu } from "@bot/menu";
import { menuCreator } from "@bot/utils/menuCreator";

const menuList = [
  {
    text: "🗓 Daily reminder",
    callback: (ctx: Context) =>
      ctx.reply("Choose 123", { reply_markup: dailyReminderMenu }),
  },
  { row: true },
  {
    text: "⏰ Price alarm",
    callback: (ctx: Context) =>
      ctx.reply("Choose 123", { reply_markup: alarmMenu }),
  },
  { row: true },
  {
    text: "📝 Proposals",
    callback: (ctx: Context) =>
      ctx.reply("Choose proposal network(s)", {
        reply_markup: proposalMenu,
      }),
  },
];

export const notificationMenu = menuCreator("notification", menuList);
