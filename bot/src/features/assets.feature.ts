import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { assetsMenu } from "@bot/menu";
import { en } from "@bot/constants/en";

export const feature = router.route("assets");

feature.command(
  en.assets.command,
  logHandle("handle /assets"),
  async (ctx: Context) => {
    await ctx.reply(en.assets.menu.title, { reply_markup: assetsMenu });
  }
);
