import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { networksResourcesMenu } from "@bot/menu";
import { en } from "@bot/constants/en";

export const feature = router.route("resources");

feature.command(
  en.resources.command,
  logHandle("handle /resources"),
  async (ctx) => {
    await ctx.reply(en.resources.menu.title, {
      reply_markup: networksResourcesMenu,
    });
  }
);
