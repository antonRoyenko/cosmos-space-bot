import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { getProposals } from "@bot/graphql/queries/getProposals";

export const feature = router.route("proposal");

feature.command("proposal", logHandle("handle /proposal"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  // TODO add proposals menu
  let output = "";

  const { proposals, activeProposals } = await getProposals();

  if (activeProposals.length === 0) {
    return ctx.reply("No active proposal");
  }

  proposals.map((title, description) => {
    output += `${title} \n \n` + `${description}`;
  });

  return ctx.reply(output);
});
