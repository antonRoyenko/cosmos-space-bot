import { logHandle } from "@bot/helpers/logging";
import { initNetworkMenu } from "@bot/menu";
import { router } from "@bot/middlewares";

export const feature = router.route("setup");

feature.command("start", logHandle("handle /start"), async (ctx) => {
  ctx.session.step = "setup";
  await ctx.reply(
    "Hello and welcome, I'm your cosmos bot, I'll help you \n" +
      "manage your assets and track important for you data. \n" +
      "Please choose network",
    { reply_markup: initNetworkMenu }
  );
});
