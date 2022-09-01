import { en } from "@bot/constants/en";
import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route("setup");

feature.command(en.start.command, logHandle("handle /start"), async (ctx) => {
  await ctx.reply(en.start.text);
});
