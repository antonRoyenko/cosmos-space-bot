import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";

export const networksAlarmMenu = new Menu<Context>("alarmNetworks", {
  autoAnswer: false,
}).dynamic(async () => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const { getNetwork } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];

      range.text(network.fullName, async (ctx) => {
        ctx.session.alarmNetwork = network;
        ctx.session.step = "notification";
        const { publicUrl, denom } = await getNetwork({
          networkId: network.id,
        });

        const { price } = await getTokenPrice({ publicUrl, denom });

        await ctx.reply(
          `Current ${network.fullName} price - ${price}$ is, please put alarm price`
        );
      });

      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }

  range.row();
  range.back("Back");

  return range;
});
