import { Menu, MenuRange } from "@grammyjs/menu";
import { notificationService, usersService } from "@bot/services";
import { Context } from "@bot/types";

export const networksReminderMenu = new Menu<Context>("reminderNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const networks = await usersService.getNetworks();

    if (networks.length > 0) {
      for (const network of networks) {
        const { isNetworkActive } = await notificationService({ ctx, network });
        const { updateNetwork } = await notificationService({ ctx, network });

        range
          .text(
            isNetworkActive
              ? `${network.fullName} 🔔`
              : `${network.fullName} 🔕`,
            async (ctx) => {
              await updateNetwork();
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
