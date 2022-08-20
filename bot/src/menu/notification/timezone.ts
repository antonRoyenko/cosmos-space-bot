import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";
import { reminderDailyMenu } from "@bot/menu/notification/dailyReminder";

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
            const { updateUser } = usersService(ctx);
            await updateUser({
              timezone,
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
