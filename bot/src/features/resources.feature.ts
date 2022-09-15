import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { networksResourcesMenu } from "@bot/menu";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.RESOURCES);

feature.command(
  en.resources.command,
  logHandle(ROUTE_LOGS.RESOURCES),
  async (ctx) => {
    await ctx.reply(en.resources.menu.title, {
      reply_markup: networksResourcesMenu,
    });
  }
);
