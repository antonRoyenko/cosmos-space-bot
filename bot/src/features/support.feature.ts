import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";

export const feature = router.route("support");

feature.command(
  en.support.command,
  logHandle("handle /support"),
  async (ctx: Context) => {
    await ctx.reply(en.support.title);
  }
);
