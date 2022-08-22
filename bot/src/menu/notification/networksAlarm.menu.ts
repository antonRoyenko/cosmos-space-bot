import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";

export const networksAlarmMenu = new Menu<Context>("alarmNetworks", {
  autoAnswer: false,
}).dynamic(async () => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (const network of networks) {
      range
        .text(network.fullName, async (ctx) => {
          ctx.session.alarmNetwork = network;
          ctx.session.step = "notification";
          const { price } = await getTokenPrice(network.name);

          await ctx.reply(
            `Current ${network.fullName} price - ${price}$ is, please put alarm price`
          );
        })
        .row();
    }
  }

  range.back("Back");

  return range;
});
