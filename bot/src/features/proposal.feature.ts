import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { networksProposalMenu } from "@bot/menu";

export const feature = router.route("proposals");

feature.command(
  en.proposals.command,
  logHandle("handle /proposals"),
  async (ctx) =>
    await ctx.reply(en.proposals.menu.title, {
      reply_markup: networksProposalMenu,
    })
);
