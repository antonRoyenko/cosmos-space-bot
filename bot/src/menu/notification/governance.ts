import { Menu, MenuRange } from "@grammyjs/menu";
import { notificationService, usersService } from "@bot/services";
import { Context } from "@bot/types";

export const governanceMenu = new Menu<Context>("governance", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const networks = await usersService.getNetworks();

    if (networks.length > 0) {
      for (const network of networks) {
        const { isGovActive, updateNetwork } = await notificationService({
          ctx,
          network,
        });

        range
          .text(
            isGovActive ? `${network.fullName} 🔔` : `${network.fullName} 🔕`,
            async (ctx) => {
              await updateNetwork(true);
              ctx.menu.update();
            }
          )
          .row();
      }
    }
  }

  range.back("Back");

  return range;
});
