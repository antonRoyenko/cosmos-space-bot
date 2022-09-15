import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, networksInNotificationService } from "@bot/services";
import { Context } from "@bot/types";
import { en } from "@bot/constants/en";

export const networksReminderMenu = new Menu<Context>("reminderNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();
  for (let i = 0; i < networks.length; i++) {
    const network = networks[i];

    const { isNetworkActive, updateReminder } =
      await networksInNotificationService({
        ctx,
        network,
      });

    range.text(
      isNetworkActive ? `🔔 ${network.fullName}` : `🔕 ${network.fullName}`,
      async (ctx) => {
        await updateReminder();
        ctx.menu.update();
      }
    );

    if ((i + 1) % 2 == 0) {
      range.row();
    }
  }

  range.row();
  range.back(en.back);

  return range;
});
