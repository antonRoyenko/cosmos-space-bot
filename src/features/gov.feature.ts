import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { getProposals } from "@bot/graphql/desmos/queries/getProposals";

export const feature = router.route("governance");

feature.command("governance", logHandle("handle /start"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  let output = "";
  ctx.session.step = "governance";

  const { proposals, activeProposals } = await getProposals();

  if (activeProposals.length === 0) {
    return ctx.reply("No active proposal");
  }

  proposals.map((title, description) => {
    output += `${title} \n \n` + `${description}`;
  });

  return ctx.reply(output);
});
