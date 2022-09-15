import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.SUPPORT);

feature.command(
  en.support.command,
  logHandle(ROUTE_LOGS.SUPPORT),
  async (ctx: Context) => {
    await ctx.reply(en.support.title);
  }
);
