import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu/wallet";

export const initNetworkMenu = new Menu<Context>("initNetwork", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const networks = await usersService.getNetworks();
    const { id: telegramId } = ctx.from;

    if (networks.length > 0) {
      for (let i = 0; i < networks.length; i++) {
        const network = networks[i];
        range
          .text(network.fullName, async (ctx) => {
            await ctx.replyWithChatAction("typing");
            ctx.session.currentNetwork = network.name;
            ctx.local.user = await usersService.updateByTelegramId(telegramId, {
              data: { networkId: network.id },
            });

            return await ctx.reply("Please choose wallet action", {
              reply_markup: walletMenu,
            });
          })
          .row();
      }
    }
  }

  return range;
});
