import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { statisticCallback } from "@bot/menu/callbacks";

export const networksStatisticMenu = new Menu<Context>("statisticNetworks", {
  autoAnswer: false,
}).dynamic(async () => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      range.text(network.fullName, async (ctx) => {
        console.log(222, ctx.update.update_id);
        return statisticCallback(ctx, network);
      });

      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }

  range.row();
  return range;
});
