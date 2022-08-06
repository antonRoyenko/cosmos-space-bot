import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { usersService } from "@bot/services";

export const feature = router.route("resources");

feature.command("resources", logHandle("handle /resources"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  ctx.session.step = "resources";
  if (!ctx.local.user?.networkId) {
    return;
  }

  const network = await usersService.getNetwork({
    id: ctx.local.user.networkId,
  });

  if (network) {
    const resource = await usersService.getResourcesById(network.resourceId);
    console.log(resource);

    return ctx.reply(
      `Website: ${resource?.site} \n` +
        `Discord: ${resource?.discord} \n` +
        `Twitter: ${resource?.twitter} \n` +
        `Youtube: ${resource?.youtube} \n` +
        `Blog: ${resource?.blog} \n` +
        `Github: ${resource?.github}`
    );
  }
});
