import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { networksStatisticMenu } from "@bot/menu";

export const feature = router.route("statistic");

feature.command("statistic", logHandle("handle /statistic"), async (ctx) => {
  await ctx.reply("Choose", { reply_markup: networksStatisticMenu });
});
