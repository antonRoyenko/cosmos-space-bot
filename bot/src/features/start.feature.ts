import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";
import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route(ROUTE.START);

feature.command(en.start.command, logHandle(ROUTE_LOGS.START), async (ctx) => {
  await ctx.reply(en.start.text);
});
