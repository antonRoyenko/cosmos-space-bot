import { router } from "@bot/middlewares";
import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { walletMenu } from "@bot/menu";

export const feature = router.route("wallet");

feature.command("wallet", logHandle("handle /wallet"), async (ctx: Context) => {
  await ctx.reply("Choose", { reply_markup: walletMenu });
});
