import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { template } from "@bot/utils";
import { en } from "@bot/constants/en";

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
          template(en.notification.alarmMenu.alarmPriceInput, {
            networkName: network.fullName,
            price: `${price}`,
          })
        );
      });

      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }

  range.row();
  range.back(en.back);

  return range;
});
