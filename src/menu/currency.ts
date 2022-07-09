import { Menu } from "@grammyjs/menu";
import { Context } from "@bot/types";

export const currentMenu = new Menu<Context>("currency").text(
  "Desmos",
  async (ctx) => {
    ctx.session.currentMenu = "desmos";
    ctx.session.step = "setup";
    return ctx.reply("Great! Now please enter wallet address");
  }
);
