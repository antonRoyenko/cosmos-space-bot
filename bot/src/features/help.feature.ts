import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route("help");

feature.command("help", logHandle("handle /start"), async (ctx) => {
  await ctx.reply(
    "/wallet - manage your wallets \n" +
      "/assets - show your assets \n" +
      "/statistic - cryptocurrency statistics \n" +
      "/notification - notification settings \n" +
      "/resources - network links \n"
  );
});
