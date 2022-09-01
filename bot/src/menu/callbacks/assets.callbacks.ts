import { Wallet } from "@prisma/client";
import { getBalance } from "@bot/graphql/queries/getBalance";
import { getTokenPrice } from "@bot/graphql/queries/getTokenPrice";
import { toNumber } from "lodash";
import { networksService } from "@bot/services";
import {
  getPositiveOrNegativeEmoji,
  getNumberEmoji,
  template,
} from "@bot/utils";
import { en } from "@bot/constants/en";

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

  output += template(en.assets.menu.walletDescription, {
    number: index ? getNumberEmoji(index) : "",
    address,
    denom: denomUppercase,
    available: data.available.value,
    delegate: data.delegate.value,
    unbonding: data.unbonding.value,
    reward: data.reward.value,
    totalCrypto: data.total.value,
    total: data.total.value,
    firstAmount: getPositiveOrNegativeEmoji(first.amount),
    seventhAmount: getPositiveOrNegativeEmoji(seventh.amount),
    fourteenthAmount: getPositiveOrNegativeEmoji(fourteenth.amount),
    thirtyAmount: getPositiveOrNegativeEmoji(thirty.amount),
    firstPercent: first.percent,
    seventhPercent: seventh.percent,
    fourteenthPercent: fourteenth.percent,
    thirtyPercent: thirty.percent,
  });

  return output;
}
