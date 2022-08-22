import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { ChainInfo } from "@bot/types/general";
import { config } from "@bot/chains";
import { atomConfig } from "@bot/chains/atom";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { getStatistic } from "@bot/graphql/queries/getStatistic";
import { formatTokenPrice } from "@bot/utils/formatTokenPrice";
import { nFormatter } from "@bot/utils/nFormatter";
import { toNumber } from "lodash";
import { Network } from "@prisma/client";

export const networksStatisticMenu = new Menu<Context>("statisticNetworks", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  await ctx.replyWithChatAction("typing");
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      range
        .text(network.fullName, async (ctx) => statisticCallback(ctx, network))
        .row();
    }
  }

  return range;
});

async function statisticCallback(ctx: Context, network: Network) {
  await ctx.replyWithChatAction("typing");

  const chain: ChainInfo =
    config.find((item) => item.network === network.name) || atomConfig;
  const { tokenUnits, primaryTokenUnit } = chain;
  const prices = await getTokenPrice(network.name);
  const publicUrl = network?.publicUrl || "";
  const denom = tokenUnits[primaryTokenUnit].display;

  const { communityPool, height, apr, inflation, bonded, unbonding, unbonded } =
    await getStatistic(publicUrl, denom, chain);
  const { first, seventh, fourteenth, thirty } = prices.PNL(1);

  return ctx.reply(
    `${communityPool?.displayDenom?.toUpperCase()} Price: ${prices.price}$ \n` +
      `APR - ${formatTokenPrice(apr * 100)}% \n` +
      `Inflation - ${formatTokenPrice(inflation * 100)}% \n` +
      `Height - ${height[0].height} \n` +
      `Community Pool - ${nFormatter(toNumber(communityPool?.value), 0)} \n` +
      `\nPrice change:\n` +
      `1d - ${first.percent}% \n` +
      `7d - ${seventh.percent}% \n` +
      `14d - ${fourteenth.percent}% \n` +
      `30d - ${thirty.percent}% \n` +
      `\nTockenomics: \n` +
      `Bonded - ${nFormatter(toNumber(bonded), 0)} \n` +
      `Unbonding - ${nFormatter(toNumber(unbonding), 0)} \n` +
      `Unbonded - ${nFormatter(toNumber(unbonded), 0)} \n`,
    { parse_mode: "HTML" }
  );
}
