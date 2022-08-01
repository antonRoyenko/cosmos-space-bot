import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { statisticMenu } from "@bot/menu";

export const feature = router.route("statistic");

feature.command("statistic", logHandle("handle /statistic"), async (ctx) => {
  ctx.session.step = "stats";
  await ctx.reply("Choose", { reply_markup: statisticMenu });
});
