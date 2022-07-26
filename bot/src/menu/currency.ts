import { Menu } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { usersService } from "@bot/services";
import { walletMenu } from "@bot/menu/wallet";

export const currentMenu = new Menu<Context>("currency").text(
  "Desmos",
  async (ctx) => {
    ctx.session.currentMenu = "desmos";
    ctx.session.step = "setup";
    const { id: telegramId } = ctx.from;
    ctx.local.user = await usersService.updateByTelegramId(telegramId, {
      data: { networkId: "desmos" },
    });
    await ctx.reply("Please choose network", { reply_markup: walletMenu });
  }
);
