import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, resourcesService } from "@bot/services";
import { Context } from "@bot/types";

export const networksResourcesMenu = new Menu<Context>("networksResources", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const { getResource } = resourcesService();
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      range
        .text(network.fullName, async (ctx) => {
          const resource = await getResource(network.resourceId);

          return ctx.reply(
            `Website: ${resource?.site} \n` +
              `Discord: ${resource?.discord} \n` +
              `Twitter: ${resource?.twitter} \n` +
              `Youtube: ${resource?.youtube ?? "&#60;not found&#62;"} \n` +
              `Blog: ${resource?.blog ?? "&#60;not found&#62;"} \n` +
              `Github: ${resource?.github}`
          );
        })
        .row();
    }
  }

  range.back("Back");

  return range;
});
