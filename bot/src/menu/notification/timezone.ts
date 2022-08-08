import { Menu, MenuRange } from "@grammyjs/menu";
import { usersService } from "@bot/services";
import { Context } from "@bot/types";

export const timezoneMenu = new Menu<Context>("timezoneMenu", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  if (ctx.from?.id) {
    const timezones = ctx.session.timezone;

    if (timezones.length > 0) {
      for (let i = 0; i < timezones.length; i++) {
        const timezone = timezones[i];
        range
          .text(timezone, async (ctx) => {
            const user = await usersService.getUserByTelegramId(
              Number(ctx?.from?.id)
            );
            const notification = await usersService.getUserNotification(
              Number(user?.notificationId)
            );

            if (notification?.id) {
              await usersService.upsertUserNotification(notification.id, {
                timezone,
              });
            }

            await ctx.reply(`You choose ${timezone} timezone`);
            ctx.menu.back();
          })
          .row();
      }
    }
  }

  range.back("Back");

  return range;
});
