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
      range.text(network.fullName, async (ctx) => {
        let output = "";
        function capitalizeFirstLetter(string: string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const resource = (await getResource(network.resourceId)) || {
          site: "",
          discord: "",
          twitter: "",
          youtube: "",
          blog: "",
          github: "",
          telegram: "",
        };
        for (const [key, value] of Object.entries(resource)) {
          if (typeof value === "string" && value.length > 0) {
            output += `${capitalizeFirstLetter(key)}: ${value} \n`;
          }
        }

        return ctx.reply(output);
      });
      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }

  range.row();
  range.back("Back");

  return range;
});
