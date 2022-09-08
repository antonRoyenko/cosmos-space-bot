import { Context } from "@bot/types";
import { Network } from "@prisma/client";
import { ChainInfo } from "@bot/types/general";
import { config } from "@bot/chains";
import { cosmosConfig } from "@bot/chains/cosmos";
import { getStatistic, getTokenPrice } from "@bot/api";
import {
  formatTokenPrice,
  getPositiveOrNegativeEmoji,
  nFormatter,
  template,
} from "@bot/utils";
import { toNumber } from "lodash";
import { en } from "@bot/constants/en";

export async function statisticCallback(ctx: Context, network: Network) {
  const chain: ChainInfo =
    config.find((item) => item.network === network.name) || cosmosConfig;
  const { tokenUnits, primaryTokenUnit, coingeckoId } = chain;
  const publicUrl = network?.publicUrl || "";
  const denom = tokenUnits[primaryTokenUnit].display;
  const prices = await getTokenPrice({
    apiId: coingeckoId,
    isHistoryInclude: true,
  });

  if (prices.price === 0) {
    return ctx.reply(`${network.fullName} - &#60;price is unknown&#62;`);
  }

  const { communityPool, height, apr, inflation, bonded, unbonding, unbonded } =
    await getStatistic(publicUrl, denom, chain, primaryTokenUnit);
  const { first, seventh, fourteenth, thirty } = prices.PNL(1);

  return ctx.reply(
    template(en.statistic.menu.statisticDescription, {
      denom: `${communityPool?.displayDenom?.toUpperCase()}`,
      price: `${prices.price}`,
      apr: `${formatTokenPrice(apr)}`,
      inflation: `${formatTokenPrice(inflation * 100)}`,
      height: `${height ?? 0}`,
      communityPool: `${nFormatter(toNumber(communityPool?.value), 2)}`,
      firstPercent: getPositiveOrNegativeEmoji(first.percent),
      seventhPercent: getPositiveOrNegativeEmoji(seventh.percent),
      fourteenthPercent: getPositiveOrNegativeEmoji(fourteenth.percent),
      thirtyPercent: getPositiveOrNegativeEmoji(thirty.percent),
      bonded: `${nFormatter(toNumber(bonded), 0)}`,
      unbonding: `${nFormatter(toNumber(unbonding), 0)}`,
      unbonded: `${nFormatter(toNumber(unbonded), 0)}`,
    }),
    { parse_mode: "HTML" }
  );
}
