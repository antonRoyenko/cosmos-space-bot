import { Menu, MenuRange } from "@grammyjs/menu";
import { notificationService } from "@bot/services";
import { Context } from "@bot/types";

export const timezoneMenu = new Menu<Context>("timezoneMenu", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const timezones = ctx.session.timezone;

    if (timezones.length > 0) {
      for (const timezone of timezones) {
        const { updateNotification } = await notificationService({ ctx });
        range
          .text(timezone, async (ctx) => {
            await updateNotification({ timezone });
            ctx.menu.back();
          })
          .row();
      }
    }
  }

  range.back("Back");

  return range;
});
