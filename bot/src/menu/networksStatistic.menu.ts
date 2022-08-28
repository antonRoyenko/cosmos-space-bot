import { Menu, MenuRange } from "@grammyjs/menu";
import { networksService } from "@bot/services";
import { Context } from "@bot/types";
import { ChainInfo } from "@bot/types/general";
import { config } from "@bot/chains";
import { cosmosConfig } from "@bot/chains/cosmos";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { getStatistic } from "@bot/graphql/queries/getStatistic";
import {
  formatTokenPrice,
  getPositiveOrNegativeEmoji,
  nFormatter,
} from "@bot/utils";
import { toNumber } from "lodash";
import { Network } from "@prisma/client";

export const networksStatisticMenu = new Menu<Context>("statisticNetworks", {
  autoAnswer: false,
}).dynamic(async () => {
  const range = new MenuRange<Context>();

  const { getAllNetworks } = networksService();
  const networks = await getAllNetworks();

  if (networks.length > 0) {
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      range.text(network.fullName, async (ctx) =>
        statisticCallback(ctx, network)
      );

      if ((i + 1) % 2 == 0) {
        range.row();
      }
    }
  }

  range.row();
  return range;
});

async function statisticCallback(ctx: Context, network: Network) {
  const chain: ChainInfo =
    config.find((item) => item.network === network.name) || cosmosConfig;
  const { tokenUnits, primaryTokenUnit } = chain;
  const publicUrl = network?.publicUrl || "";
  const denom = tokenUnits[primaryTokenUnit].display;
  const prices = await getTokenPrice({
    publicUrl,
    denom,
    apiId: chain.coingeckoId,
  });

  if (prices.price === 0) {
    return ctx.reply(`${network.fullName} - &#60;price is unknown&#62;`);
  }

  const { communityPool, height, apr, inflation, bonded, unbonding, unbonded } =
    await getStatistic(publicUrl, denom, chain);
  const { first, seventh, fourteenth, thirty } = prices.PNL(1);

  return ctx.reply(
    `<b>${communityPool?.displayDenom?.toUpperCase()} Price</b>: 🔥 💲${
      prices.price
    } 🔥 \n\n` +
      `<i>💸 APR</i> - ${formatTokenPrice(apr * 100)}% \n\n` +
      `<i>📊 Inflation</i> - ${formatTokenPrice(inflation * 100)}% \n\n` +
      `<i>🔝 Height</i> - ${height[0].height} \n\n` +
      `<i>🌐 Community Pool</i> - ${nFormatter(
        toNumber(communityPool?.value),
        2
      )} \n` +
      `\n<b>Price change</b>:\n\n` +
      `▫️ <i>For today</i> - ${getPositiveOrNegativeEmoji(
        first.percent
      )}% \n\n` +
      `▫️ <i>In 7 days</i> - ${getPositiveOrNegativeEmoji(
        seventh.percent
      )}% \n\n` +
      `▫️ <i>In 14 days</i> - ${getPositiveOrNegativeEmoji(
        fourteenth.percent
      )}% \n\n` +
      `▫️ <i>In 30 days</i> - ${getPositiveOrNegativeEmoji(
        thirty.percent
      )}% \n\n` +
      `<b>Tockenomics</b>: \n\n` +
      `<i>🔒 Bonded</i> - ${nFormatter(toNumber(bonded), 0)} \n\n` +
      `<i>🔐 Unbonding</i> - ${nFormatter(toNumber(unbonding), 0)} \n\n` +
      `<i>🔓 Unbonded</i> - ${nFormatter(toNumber(unbonded), 0)} \n`,
    { parse_mode: "HTML" }
  );
}
