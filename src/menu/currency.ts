import { Menu } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { usersService } from "@bot/services";

export const currentMenu = new Menu<Context>("currency").text(
  "Desmos",
  async (ctx) => {
    ctx.session.currentMenu = "desmos";
    ctx.session.step = "setup";
    const { id: telegramId } = ctx.from;
    ctx.local.user = await usersService.updateByTelegramId(telegramId, {
      data: { networkId: "desmos" },
    });
    return ctx.reply("Great! Now please enter wallet address");
  }
);
