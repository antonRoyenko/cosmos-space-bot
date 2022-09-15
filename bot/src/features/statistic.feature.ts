import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { networksStatisticMenu } from "@bot/menu";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.STATISTIC);

feature.command(
  en.statistic.command,
  logHandle(ROUTE_LOGS.STATISTIC),
  async (ctx) => {
    await ctx.reply(en.statistic.menu.title, {
      reply_markup: networksStatisticMenu,
    });
  }
);
