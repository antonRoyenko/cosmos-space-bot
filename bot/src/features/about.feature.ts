import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.ABOUT);

feature.command(
  en.about.command,
  logHandle(ROUTE_LOGS.ABOUT),
  async (ctx: Context) => {
    await ctx.reply(en.about.title, { disable_web_page_preview: true });
  }
);
