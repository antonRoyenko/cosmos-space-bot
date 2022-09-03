import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";

export const feature = router.route("about");

feature.command(
  en.about.command,
  logHandle("handle /about"),
  async (ctx: Context) => {
    await ctx.reply(en.about.title, { disable_web_page_preview: true });
  }
);
