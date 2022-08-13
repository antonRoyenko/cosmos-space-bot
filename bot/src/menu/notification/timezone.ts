import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";
import { reminderDailyMenu } from "@bot/menu/notification/daily";

export const timezoneMenu = new Menu<Context>("timezoneMenu", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const timezones = ctx.session.timezone;

    if (timezones.length > 0) {
      for (const timezone of timezones) {
        range
          .text(timezone, async (ctx) => {
            await usersService.updateByTelegramId(ctx.from?.id, {
              data: {
                timezone,
              },
            });
            await ctx.reply("Timezone was saved", {
              reply_markup: reminderDailyMenu,
            });
          })
          .row();
      }
    }
  }

  return range;
});
