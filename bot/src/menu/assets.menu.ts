import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { walletsService } from "@bot/services";
import { assetsCallback, totalAmountCallback } from "@bot/menu/callbacks";
import { en } from "@bot/constants/en";

let currentUpdateId = 0;

export const assetsMenu = new Menu<Context>("assets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { getAllUserWallets } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  for (let i = 0; i < userWallets.length; i++) {
    const wallet = userWallets[i];
    range.text(wallet.name || wallet.address, async (ctx) => {
      const output = await assetsCallback(wallet);
      return ctx.reply(output);
    });

    range.row();
  }

  range.row();
  range.text(en.assets.menu.all, async () => {
    currentUpdateId = ctx.update.update_id;
    if (currentUpdateId === ctx.update.update_id) {
      return;
    }
    await ctx.replyWithChatAction("typing");

    const output = await totalAmountCallback(ctx);

    return ctx.reply(output);
  });

  return range;
});
