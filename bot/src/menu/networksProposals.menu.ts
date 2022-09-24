import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { getProposals } from "@bot/api";
import { en } from "@bot/constants/en";
import { template, getNumberEmoji } from "@bot/utils";

export const networksProposalMenu = new Menu<Context>("networksProposal", {
  autoAnswer: false,
}).dynamic(async () => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      range.text(network.fullName, async function (ctx) {
        let output = "";
        const { activeProposals } = await getProposals(network.publicUrl);

        if (activeProposals.length === 0) {
          return ctx.reply(en.proposals.menu.noProposal);
        }

        activeProposals.map(({ title, description, proposalId }, key) => {
          if (activeProposals.length > 1) {
            output += template(en.proposals.menu.proposalDescriptionTitle, {
              number: getNumberEmoji(key + 1),
            });
          }
          const str = template(en.proposals.menu.proposalDescription, {
            title: title,
            description: description,
          });
          output += str.replaceAll(/[\\]+[n]/gm, "\n");

          if (output.length > 4000) {
            output = output.slice(0, 4000) + "... \n\n";
          }

          if (network.keplrId) {
            output += template(en.proposals.menu.proposalDescriptionLink, {
              keplrId: `${network.keplrId}`,
              proposalId: `${proposalId}`,
            });
          }
        });

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
