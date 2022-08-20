import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";

export const feature = router.route("help");

feature.command("help", logHandle("handle /start"), async (ctx) => {
  ctx.session.step = "help";

  await ctx.reply(
    "/wallet - show your assets \n" +
      "/statistics - cryptocurrency statistics \n" +
      "/notification - notification settings \n" +
      "/resources - network links \n"
  );
});
