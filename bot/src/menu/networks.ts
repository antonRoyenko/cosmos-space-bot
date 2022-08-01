import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu/wallet";

export const networkMenu = new Menu<Context>("networkMenu", {
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
            ctx.local.user = await usersService.updateByTelegramId(telegramId, {
              data: { networkId: network.id },
            });

            if (ctx.session.step === "setup") {
              return await ctx.reply("Please choose wallet action", {
                reply_markup: walletMenu,
              });
            }

            return ctx.reply(
              `Network ${network.fullName} was successfully saved, now you can find network statistic`
            );
          })
          .row();
      }
    }
  }

  return range;
});
