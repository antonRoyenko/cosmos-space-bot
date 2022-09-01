import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";
import { dailyReminderMenu } from "@bot/menu/notification/dailyReminder.menu";

export const timezoneMenu = new Menu<Context>("timezoneMenu", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const timezones = ctx.session.timezone;

  if (timezones.length > 0) {
    for (const timezone of timezones) {
      range
        .text(timezone, async (ctx) => {
          const { updateUser } = usersService(ctx);
          const regex = /[a-zA-Z]|[/]/g;
          await updateUser({
            timezone: timezone.match(regex)?.join(""),
          });
          await ctx.reply("Timezone saved", {
            reply_markup: dailyReminderMenu,
          });
        })
        .row();
    }
  }

  return range;
});
