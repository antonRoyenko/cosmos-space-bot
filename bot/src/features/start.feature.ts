import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route("setup");

feature.command("start", logHandle("handle /start"), async (ctx) => {
  await ctx.reply(
    "Hello and welcome, I'm your cosmos bot, I'll help you \n" +
      "manage your assets and track important for you data. \n" +
      "you can find all command /help"
  );
});
