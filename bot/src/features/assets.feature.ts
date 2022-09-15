import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { assetsMenu } from "@bot/menu";
import { en } from "@bot/constants/en";
import { walletsService } from "@bot/services";
import { ROUTE } from "@bot/constants/route";

export const feature = router.route(ROUTE.ASSETS);

feature.command(
  en.assets.command,
  logHandle(ROUTE.ASSETS),
  async (ctx: Context) => {
    const { getAllUserWallets } = walletsService(ctx);
    const userWallets = await getAllUserWallets();

    if (userWallets.length === 0) {
      return ctx.reply(en.wallet.emptyWallet);
    }

    await ctx.reply(en.assets.menu.title, { reply_markup: assetsMenu });
  }
);
