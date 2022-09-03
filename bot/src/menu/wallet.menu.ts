import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { walletRemoveMenu } from "@bot/menu";
import { walletsService } from "@bot/services";
import { getNumberEmoji, template } from "@bot/utils";
import { en } from "@bot/constants/en";
import { config } from "@bot/config";

export const walletMenu = new Menu<Context>("wallets", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  ctx.session.step = undefined;
  const range = new MenuRange<Context>();
  range
    .url(en.wallet.menu.keplr, `${config.UI_URL}?telegram-id=${ctx.from?.id}`)
    .text(en.wallet.menu.manually, (ctx) => {
      ctx.session.step = "wallet";
      return ctx.reply(en.wallet.addAddress);
    })
    .row()
    .text(en.wallet.menu.list, async (ctx) => {
      let wallets = "";
      const { getAllUserWallets } = walletsService(ctx);
      const userWallets = await getAllUserWallets();

      if (userWallets.length === 0) {
        return ctx.reply(en.wallet.emptyWallet);
      }

      userWallets.forEach(
        ({ address }, key) =>
          (wallets +=
            template(en.wallet.showWallet, {
              number: getNumberEmoji(key + 1),
              address,
            }) + "\n\n")
      );

      await ctx.reply(wallets);
    })
    .row()
    .text(en.wallet.menu.delete, async (ctx) => {
      const { getAllUserWallets } = walletsService(ctx);
      const userWallets = await getAllUserWallets();

      if (userWallets.length === 0) {
        return ctx.reply(en.wallet.emptyWallet);
      }

      return ctx.reply(en.wallet.deleteWallet, {
        reply_markup: walletRemoveMenu,
      });
    });
  return range;
});
