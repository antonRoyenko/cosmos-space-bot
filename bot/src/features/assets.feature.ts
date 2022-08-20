import { logHandle } from "@bot/helpers/logging";
import { Context } from "@bot/types";
import { router } from "@bot/middlewares";
import { getBalance } from "@bot/graphql/queries/getBalance";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { toNumber } from "lodash";
import { walletsService, networksService } from "@bot/services";
import { bech32 } from "bech32";
import { Wallet } from "@prisma/client";

export const feature = router.route("assets");

feature.command("assets", logHandle("handle /assets"), async (ctx: Context) => {
  await ctx.replyWithChatAction("typing");
  let output = "";
  const { getAllUserWallets } = walletsService(ctx);
  const wallets: Wallet[] = await getAllUserWallets();

  if (wallets.length > 0) {
    await Promise.all(
      wallets.map(async ({ address, networkId }) => {
        const { getNetwork } = networksService();
        const prefix = bech32.decode(address).prefix;
        const url = await getNetwork({ networkId });
        const publicUrl = url?.publicUrl || "";
        const data = await getBalance(publicUrl, address, prefix);
        const prices = await getTokenPrice(prefix);
        const { first, seventh, thirty } = prices.PNL(
          toNumber(data.total.value)
        );

        output +=
          `Wallet: ${address} \n` +
          `\nBalance in ${data.available.displayDenom}: \n` +
          `Available - ${data.available.value} \n` +
          `Delagated - ${data.delegate.value} \n` +
          `Unbonding - ${data.unbonding.value} \n` +
          `Staking Reward - ${data.reward.value} \n` +
          // `Commission - ${data.commission.value} \n` +
          `\nTotal ${data.total.displayDenom} - ${data.total.value} \n` +
          `Total USD - ${prices.totalFiat(toNumber(data.total.value))} \n` +
          `\nPNL: \n` +
          `for today ${first.percent}% ${first.amount}${data.total.displayDenom} \n` +
          `in 7 days ${seventh.percent}% ${seventh.amount}${data.total.displayDenom} \n` +
          `in 30 days ${thirty.percent}% ${thirty.amount}${data.total.displayDenom} \n\n`;
      })
    );
  }

  return ctx.reply(output, { parse_mode: "HTML" });
});
