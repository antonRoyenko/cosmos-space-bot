import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { usersService } from "@bot/services";

export const feature = router.route("resources");

feature.command("resources", logHandle("handle1 /start"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  ctx.session.step = "resources";
  if (!ctx.local.user?.networkId) {
    return;
  }

  const resources = await usersService.getResourcesById(
    ctx.local.user.networkId
  );

  return ctx.reply(
    `Website: ${resources?.site} \n` +
      `Discord: ${resources?.discord} \n` +
      `Twitter: ${resources?.twitter} \n` +
      `Youtube: ${resources?.youtube} \n` +
      `Medium: ${resources?.medium} \n` +
      `Github: ${resources?.github}`
  );
});
