import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService, resourcesService } from "@bot/services";
import { Context } from "@bot/types";
import { capitalizeFirstLetter, template } from "@bot/utils";
import { en } from "@bot/constants/en";

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
      range.text(`${network.fullName}`, async (ctx) => {
        let output = "";

        const resource = (await getResource(network.resourceId)) || {
          site: "",
          discord: "",
          twitter: "",
          youtube: "",
          blog: "",
          github: "",
          telegram: "",
        };
        for (const [item, link] of Object.entries(resource)) {
          if (typeof link === "string" && link.length > 0) {
            output += template(en.resources.menu.resourceItem, {
              item: capitalizeFirstLetter(item),
              link,
            });
          }
        }

        return ctx.reply(output, { disable_web_page_preview: true });
      });
      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }

  range.row();

  return range;
});
