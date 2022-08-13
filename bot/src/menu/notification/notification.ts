import { Menu } from "@grammyjs/menu";
import { reminderDailyMenu } from "./daily";
import { alarmMenu } from "./alarm";
import { Context } from "@bot/types";

export const notificationMenu = new Menu<Context>("notification")
  .text("Daily reminder", (ctx) =>
    ctx.reply("Choose 123", { reply_markup: reminderDailyMenu })
  )
  .row()
  .text("Price alarm", (ctx) =>
    ctx.reply("Choose 123", { reply_markup: alarmMenu })
  )
  .row()
  .text("Governance", (ctx) => ctx.reply("You pressed A!"));
