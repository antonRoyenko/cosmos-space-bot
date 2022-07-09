import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { fetchBalance } from "@bot/graphql/desmos/queries/fetchBalance";
import { fetchTokenPrice } from "@bot/graphql/desmos/queries/fetchTokenPrice";
import { toNumber } from "lodash";

export const feature = router.route("wallet");

feature.command("wallet", logHandle("handle /wallet"), async (ctx: Context) => {
  await ctx.replyWithChatAction("typing");
  const wallets = ctx.session.currentWallets;
  const prices = await fetchTokenPrice();
  let output = "";

  await Promise.all(
    wallets.map(async (wallet) => {
      const data = await fetchBalance(wallet);
      const { first, seventh, thirty } = prices.PNL(toNumber(data.total.value));
      output += `
Wallet: ${wallet} \n
Balance in ${data.available.displayDenom}:
Available - ${data.available.value}
Delagated - ${data.delegate.value}
Unbonding - ${data.unbonding.value}
Staking Reward - ${data.reward.value}
Commission - ${data.commission.value}

Total ${data.total.displayDenom} - ${data.total.value}
Total USD - ${prices.totalFiat(toNumber(data.total.value))}

PNL:
for today ${first.percent}% ${first.amount}${data.total.displayDenom}
in 7 days ${seventh.percent}% ${seventh.amount}${data.total.displayDenom}
in 30 days ${thirty.percent}% ${thirty.amount}${data.total.displayDenom}
`;
    })
  );

  return ctx.reply(output, { parse_mode: "HTML" });
});
