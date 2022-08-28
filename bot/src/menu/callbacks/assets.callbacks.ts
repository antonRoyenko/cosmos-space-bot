import { Wallet } from "@prisma/client";
import { getBalance } from "@bot/graphql/queries/getBalance";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { toNumber } from "lodash";
import { networksService } from "@bot/services";
import { getPositiveOrNegativeEmoji, getNumberEmoji } from "@bot/utils";

export async function assetsCallback(wallet: Wallet, index?: number) {
  let output = "";

  const { getNetwork } = networksService();
  const { address, networkId } = wallet;
  const { coingeckoId, publicUrl, denom, network } = await getNetwork({
    networkId,
  });

  const prices = await getTokenPrice({
    publicUrl,
    denom: denom,
    apiId: coingeckoId,
  });
  const data = await getBalance(publicUrl, address, network.name);
  const { first, seventh, fourteenth, thirty } = prices.PNL(
    toNumber(data.total.value)
  );
  const denomUppercase = data.available.displayDenom.toUpperCase();

  output +=
    `<b>Wallet ${
      index ? getNumberEmoji(index) : ""
    }:</b> <i>${address}</i> \n` +
    `\n<b>Balance in ${denomUppercase}: </b>\n\n` +
    `<i>👉 Available</i> — ${data.available.value} \n\n` +
    `<i>💸 Delegated</i> — ${data.delegate.value} \n\n` +
    `<i>🔐 Unbonding</i> — ${data.unbonding.value} \n\n` +
    `<i>🤑 Staking Reward</i> — ${data.reward.value} \n` +
    `\n<b>Total ${denomUppercase}</b> — ${data.total.value} \n` +
    `<b>Total USD</b> — 💲${prices.totalFiat(toNumber(data.total.value))} \n` +
    `\n<b>P&L:</b> \n` +
    `▫️ <i>For today</i> ${getPositiveOrNegativeEmoji(
      first.amount
    )}${denomUppercase} (${first.percent}%) \n\n` +
    `▫️ <i>In 7 days</i> ${getPositiveOrNegativeEmoji(
      seventh.amount
    )}${denomUppercase} (${seventh.percent}%) \n\n` +
    `▫️ <i>In 14 days</i> ${getPositiveOrNegativeEmoji(
      seventh.amount
    )}${denomUppercase} (${fourteenth.percent}%) \n\n` +
    `▫️ <i>In 30 days</i> ${getPositiveOrNegativeEmoji(
      thirty.amount
    )}${denomUppercase} (${thirty.percent}%) \n\n`;

  return output;
}
