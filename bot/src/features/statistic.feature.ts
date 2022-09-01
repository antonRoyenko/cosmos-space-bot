import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { networksStatisticMenu } from "@bot/menu";
import { en } from "@bot/constants/en";

export const feature = router.route("statistic");

feature.command(
  en.statistic.command,
  logHandle("handle /statistic"),
  async (ctx) => {
    await ctx.reply(en.statistic.menu.title, {
      reply_markup: networksStatisticMenu,
    });
  }
);
