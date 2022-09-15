import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { ROUTE } from "@bot/constants/route";

export const feature = router.route(ROUTE.HELP);

feature.command(en.help.command, logHandle(ROUTE.HELP), async (ctx) => {
  await ctx.reply(en.help.text);
});
