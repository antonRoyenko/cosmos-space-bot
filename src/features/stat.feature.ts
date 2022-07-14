import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { getTokenPrice } from "@bot/graphql/desmos/queries/getTokenPrice";
import { getStatistic } from "@bot/graphql/desmos/queries/getStatistic";
import { toNumber } from "lodash";
import { formatTokenPrice } from "@bot/utils/formatTokenPrice";
import { nFormatter } from "@bot/utils/nFormatter";

export const feature = router.route("statistic");

feature.command("statistic", logHandle("handle1 /start"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  ctx.session.step = "stats";

  const prices = await getTokenPrice();
  const { communityPool, height, apr, inflation, bonded, unbonding, unbonded } =
    await getStatistic();
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
});
