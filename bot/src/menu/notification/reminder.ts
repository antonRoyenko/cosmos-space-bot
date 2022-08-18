import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, networksInNotificationService } from "@bot/services";
import { Context } from "@bot/types";

export const networksReminderMenu = new Menu<Context>("reminderNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const { getAllNetworks } = networksService();
    const networks = await getAllNetworks();

    if (networks.length > 0) {
      for (const network of networks) {
        const { isNetworkActive, updateReminder } =
          await networksInNotificationService({
            ctx,
            network,
          });

        range
          .text(
            isNetworkActive
              ? `${network.fullName} 🔔`
              : `${network.fullName} 🔕`,
            async (ctx) => {
              await updateReminder();
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
