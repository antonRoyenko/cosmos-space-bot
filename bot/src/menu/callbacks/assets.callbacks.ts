import { Wallet } from "@prisma/client";
import { getBalance, getTokenPrice } from "@bot/api";
import { toNumber } from "lodash";
import { networksService } from "@bot/services";
import {
  getPositiveOrNegativeEmoji,
  getNumberEmoji,
  template,
} from "@bot/utils";
import { en } from "@bot/constants/en";
import { cw20line } from "@bot/constants/regex";

export async function assetsCallback(wallet: Wallet, index?: number) {
  let output = "";

  const { getNetwork } = networksService();
  const { address, networkId } = wallet;
  const { coingeckoId, publicUrl, network } = await getNetwork({
    networkId,
  });

  const prices = await getTokenPrice({
    apiId: coingeckoId,
    isHistoryInclude: true,
  });
  const data = await getBalance(publicUrl, address, network.name);
  const { first, seventh, fourteenth, thirty } = prices.PNL(
    toNumber(data.total.value)
  );
  const cw20str = data.cw20tokens
    .map((item) => `${item.displayDenom} — ${item.value} \n`)
    .join("");
  const denomUppercase = data.available.displayDenom.toUpperCase();

  output += template(en.assets.menu.walletDescription, {
    number: index ? getNumberEmoji(index) : "",
    address,
    denom: denomUppercase,
    available: data.available.value,
    delegate: data.delegate.value,
    unbonding: data.unbonding.value,
    reward: data.reward.value,
    totalCrypto: data.total.value,
    total: prices.totalFiat(toNumber(data.total.value)),
    firstAmount: getPositiveOrNegativeEmoji(first.amount),
    seventhAmount: getPositiveOrNegativeEmoji(seventh.amount),
    fourteenthAmount: getPositiveOrNegativeEmoji(fourteenth.amount),
    thirtyAmount: getPositiveOrNegativeEmoji(thirty.amount),
    firstPercent: first.percent,
    seventhPercent: seventh.percent,
    fourteenthPercent: fourteenth.percent,
    thirtyPercent: thirty.percent,
    cw20: cw20str,
  });

  console.log(data.cw20tokens.length);

  output = data.cw20tokens.length > 0 ? output : output.replace(cw20line, "");

  return output;
}
