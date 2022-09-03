import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { assetsMenu } from "@bot/menu";
import { en } from "@bot/constants/en";
import { walletsService } from "@bot/services";

export const feature = router.route("assets");

feature.command(
  en.assets.command,
  logHandle("handle /assets"),
  async (ctx: Context) => {
    const { getAllUserWallets } = walletsService(ctx);
    const userWallets = await getAllUserWallets();

    if (userWallets.length === 0) {
      return ctx.reply(en.wallet.emptyWallet);
    }

    await ctx.reply(en.assets.menu.title, { reply_markup: assetsMenu });
  }
);
