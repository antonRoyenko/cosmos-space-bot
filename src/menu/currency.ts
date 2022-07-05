import { Menu } from "@grammyjs/menu";
import { Context } from "@bot/types";

export const currencyMenu = new Menu<Context>("currency").text(
  "Desmos",
  (ctx) => {
    ctx.session.currencyMenu = "desmos";
    ctx.session.step = "home";
    return ctx.reply("Great! Now you can use any of commands /help");
  }
);
