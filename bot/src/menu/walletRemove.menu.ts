import { Menu, MenuRange } from "@grammyjs/menu";
import { walletsService } from "@bot/services";
import { Context } from "@bot/types";
import { template } from "@bot/utils";
import { en } from "@bot/constants/en";

export const walletRemoveMenu = new Menu<Context>("walletRemove", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const range = new MenuRange<Context>();

  const { getAllUserWallets, removeUserWallet } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  if (userWallets.length > 0) {
    for (let i = 0; i < userWallets.length; i++) {
      const currWallet = userWallets[i];
      range
        .text(currWallet.name || currWallet.address, async (ctx) => {
          await removeUserWallet(currWallet.id);
          return ctx.reply(
            template(en.wallet.removedWallet, {
              address: currWallet.name || currWallet.address,
            })
          );
        })
        .row();
    }
  }

  return range;
});
