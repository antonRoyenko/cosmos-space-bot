import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";

export const alarmNetworksMenu = new Menu<Context>("alarmNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const networks = await usersService.getNetworks();

    if (networks.length > 0) {
      for (const network of networks) {
        range
          .text(network.fullName, async (ctx) => {
            ctx.session.alarmNetwork = network;
            const { price } = await getTokenPrice(network.name);

            await ctx.reply(
              `Current ${network.fullName} price - ${price}$ is, please put alarm price`
            );
          })
          .row();
      }
    }
  }

  range.back("Back");

  return range;
});
