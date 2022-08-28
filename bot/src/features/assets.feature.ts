import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { assetsMenu } from "@bot/menu";

export const feature = router.route("assets");

feature.command("assets", logHandle("handle /assets"), async (ctx: Context) => {
  await ctx.reply("Choose wallet(s)", { reply_markup: assetsMenu });
});
