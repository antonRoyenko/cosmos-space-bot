import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, usersService } from "@bot/services";
import { Context } from "@bot/types";

export const networksStatisticMenu = new Menu<Context>("statisticNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      range
        .text(network.fullName, async (ctx) => {
          const { updateUser } = usersService(ctx);
          await updateUser({
            networkId: network.id,
          });

          return ctx.reply(
            `Network ${network.fullName} was successfully saved, now you can find network statistic`
          );
        })
        .row();
    }
  }

  range.back("Back");

  return range;
});
