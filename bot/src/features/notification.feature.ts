import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { governanceSubscription } from "@bot/graphql/queries/governanceSubscription";

export const feature = router.route("notification");

feature.command(
  "notification",
  logHandle("handle /notification"),
  async (ctx) => {
    await ctx.replyWithChatAction("typing");
    governanceSubscription();

    return null;
  }
);
