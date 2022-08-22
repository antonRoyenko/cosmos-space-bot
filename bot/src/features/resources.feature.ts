import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { networksResourcesMenu } from "@bot/menu";

export const feature = router.route("resources");

feature.command("resources", logHandle("handle /resources"), async (ctx) => {
  await ctx.reply("Choose network", {
    reply_markup: networksResourcesMenu,
  });
});
