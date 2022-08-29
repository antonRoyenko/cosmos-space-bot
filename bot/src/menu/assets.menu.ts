import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { walletsService } from "@bot/services";
import { assetsCallback } from "@bot/menu/callbacks";

export const assetsMenu = new Menu<Context>("assets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { getAllUserWallets } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  if (userWallets.length > 0) {
    for (let i = 0; i < userWallets.length; i++) {
      const wallet = userWallets[i];
      range.text(wallet.address, async (ctx) => {
        const output = await assetsCallback(wallet);
        return ctx.reply(output);
      });

      range.row();
    }
  }

  range.row();
  range.text("All wallets", async () => {
    await ctx.replyWithChatAction("typing");
    let output = "";

    await Promise.all(
      userWallets
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map(async (wallet, index) => {
          const callbackStr = await assetsCallback(wallet, index + 1);
          output += `${callbackStr}`;
        })
    );

    return ctx.reply(output);
  });
  return range;
});
