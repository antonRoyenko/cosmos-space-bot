import { Menu } from "@grammyjs/menu";
import { reminderDailyMenu } from "./daily";

export const notificationMenu = new Menu("notification")
  .text("Daily reminder", (ctx) =>
    ctx.reply("Choose 123", { reply_markup: reminderDailyMenu })
  )
  .row()
  .text("Price alarm", (ctx) =>
    ctx.reply("Choose 123", { reply_markup: reminderDailyMenu })
  )
  .row()
  .text("Governance", (ctx) => ctx.reply("You pressed A!"));
