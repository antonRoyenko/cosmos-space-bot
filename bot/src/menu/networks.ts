import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";

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
            ctx.local.user = await usersService.updateByTelegramId(telegramId, {
              data: { networkId: network.id },
            });

            return ctx.reply(
              `Network ${network.fullName} was successfully saved, now you can find network statistic`
            );
          })
          .row();
      }
    }
  }

  range.back("Back");

  return range;
});
