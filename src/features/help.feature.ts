import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route("help");

feature.command("help", logHandle("handle /start"), async (ctx) => {
  ctx.session.step = "help";

  await ctx.reply(
    "/wallet - show your assets \n" +
      "/stats - network statistic \n" +
      "/gov - active governance \n" +
      "/resources - useful network resources \n" +
      "/add - add wallet \n" +
      "/reset - reset your wallet"
  );
});
