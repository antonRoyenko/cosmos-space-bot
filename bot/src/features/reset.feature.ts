import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";

export const feature = router.route("proposals");

feature.command(
  en.reset.command,
  logHandle("handle /proposals"),
  async (ctx) => {
    ctx.session.step = undefined;
    return await ctx.reply(en.reset.title);
  }
);
