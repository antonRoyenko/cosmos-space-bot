import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "@bot/types";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { getStatistic } from "@bot/graphql/queries/getStatistic";
import { formatTokenPrice } from "@bot/utils/formatTokenPrice";
import { nFormatter } from "@bot/utils/nFormatter";
import { toNumber } from "lodash";
import { config } from "@bot/chains";
import { atomConfig } from "@bot/chains/atom";
import { usersService } from "@bot/services";
import { ChainInfo } from "@bot/types/general";
import { networkMenu } from "@bot/menu";

export const statisticMenu = new Menu<Context>("statistic", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const { currentNetwork } = ctx.session;
  const network = await usersService.getNetwork({ name: currentNetwork });

  if (network) {
    const range = new MenuRange<Context>();
    range
      .text(`Show ${network.fullName} statistic`, statisticCallback)
      .row()
      .text("Change network", (ctx) =>
        ctx.reply("Choose network", { reply_markup: networkMenu })
      );

    return range;
  }
});

async function statisticCallback(ctx: Context) {
  await ctx.replyWithChatAction("typing");
  ctx.session.step = "stats";
  const { currentNetwork } = await ctx.session;

  if (currentNetwork) {
    const chain: ChainInfo =
      config.find(({ network }) => network === currentNetwork) || atomConfig;
    const { tokenUnits, primaryTokenUnit } = chain;
    const prices = await getTokenPrice(currentNetwork);
    const url = await usersService.getNetwork({ name: currentNetwork });
    const publicUrl = url?.publicUrl || "";
    const denom = tokenUnits[primaryTokenUnit].display;

    const {
      communityPool,
      height,
      apr,
      inflation,
      bonded,
      unbonding,
      unbonded,
    } = await getStatistic(publicUrl, denom, chain);
    const { first, seventh, fourteenth, thirty } = prices.PNL(1);

    return ctx.reply(
      `${communityPool?.displayDenom?.toUpperCase()} Price: ${
        prices.price
      }$ \n` +
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
}
