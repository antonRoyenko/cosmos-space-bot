import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";

export const feature = router.route("help");

feature.command(en.help.command, logHandle("handle /start"), async (ctx) => {
  await ctx.reply(en.help.text);
});
