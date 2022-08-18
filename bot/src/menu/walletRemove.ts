import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService, walletsService } from "@bot/services";
import { Context } from "@bot/types";

export const walletRemoveMenu = new Menu<Context>("walletRemove", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const { getAllUserWallets, removeUserWallet } = walletsService(ctx);
    const userWallets = await getAllUserWallets();

    if (userWallets) {
      for (let i = 0; i < userWallets.length; i++) {
        const currWallet = userWallets[i];
        range
          .text(currWallet.toString(), async (ctx) => {
            await ctx.replyWithChatAction("typing");
            await removeUserWallet(currWallet.id);
            return ctx.reply(`Wallet ${currWallet} was successful removed`);
          })
          .row();
      }
    }
  }

  return range;
});
