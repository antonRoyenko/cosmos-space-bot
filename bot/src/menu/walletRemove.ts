import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";

export const walletRemove = new Menu<Context>("walletRemove", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const { id: telegramId } = ctx.from;
    const user = await usersService.getUserByTelegramId(telegramId);

    if (user?.wallets) {
      for (let i = 0; i < user.wallets.length; i++) {
        const currWallet = user.wallets[i];
        range
          .text(currWallet.toString(), async (ctx) => {
            await ctx.replyWithChatAction("typing");
            const filteredWallets = user.wallets.filter(
              (item) => item !== currWallet
            );
            ctx.local.user = await usersService.updateByTelegramId(telegramId, {
              data: { wallets: filteredWallets },
            });
            return ctx.reply(`Wallet ${currWallet} was successful removed`);
          })
          .row();
      }
    }
  }

  return range;
});
