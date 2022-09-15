import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { networksProposalMenu } from "@bot/menu";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.RESET);

feature.command(
  en.proposals.command,
  logHandle(ROUTE_LOGS.RESET),
  async (ctx) =>
    await ctx.reply(en.proposals.menu.title, {
      reply_markup: networksProposalMenu,
    })
);
