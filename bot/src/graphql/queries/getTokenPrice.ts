import Big from "big.js";
import {
  fetchTokenHistory,
  fetchTokenPrice as fetchTokenPriceApi,
} from "./fetchTokenPrice";
import { formatTokenPrice, calcTVLPercent } from "@bot/utils";
import { CoinHistoryResponse } from "@bot/types/general";

export async function getTokenPrice({
  publicUrl,
  denom,
}: {
  publicUrl: string;
  denom: string;
}): Promise<{
  price: number;
}>;
export async function getTokenPrice({
  publicUrl,
  denom,
  apiId,
}: {
  publicUrl: string;
  denom: string;
  apiId: string;
}): Promise<{
  price: number;
  totalFiat: (total: number) => string;
  PNL: any;
}>;
export async function getTokenPrice({
  publicUrl,
  denom,
  apiId,
}: {
  publicUrl: string;
  denom: string;
  apiId?: string;
}) {
  const price = await fetchTokenPriceApi(publicUrl, denom);
  if (price.tokenPrice.length === 0) {
    return { price: 0 };
  }
  const currentPrice = price.tokenPrice[0].price;

  if (!apiId) {
    return { price: currentPrice };
  }

  const tokenHistory = await fetchTokenHistory(apiId);

  return {
    price: currentPrice,
    ...formatTokenHistory(tokenHistory.tokenPrice, currentPrice),
  };
}

export const formatTokenHistory = (
  tokenHistory: Array<CoinHistoryResponse>,
  price: number
) => {
  const totalFiat = (total: number) => {
    return `${formatTokenPrice(price * total)}`;
  };

  const PNL = (amount: number) => {
    let firstDayPercent = "0";
    if (tokenHistory[0]?.market_data?.current_price) {
      firstDayPercent = calcTVLPercent(
        price,
        tokenHistory[0].market_data.current_price.usd
      );
    }

    let seventhDayPercent = "0";
    if (tokenHistory[1]?.market_data?.current_price) {
      seventhDayPercent = calcTVLPercent(
        price,
        tokenHistory[1].market_data.current_price.usd
      );
    }

    let fourteenthDayPercent = "0";
    if (tokenHistory[2]?.market_data?.current_price) {
      fourteenthDayPercent = calcTVLPercent(
        price,
        tokenHistory[2].market_data.current_price.usd
      );
    }

    let thirtyDayPercent = "0";
    if (tokenHistory[3]?.market_data?.current_price) {
      thirtyDayPercent = calcTVLPercent(
        price,
        tokenHistory[3].market_data.current_price.usd
      );
    }

    return {
      first: {
        percent: formatTokenPrice(firstDayPercent),
        amount: formatTokenPrice(
          Big(amount).div(100).mul(firstDayPercent).toPrecision()
        ),
      },
      seventh: {
        percent: formatTokenPrice(seventhDayPercent),
        amount: formatTokenPrice(
          Big(amount).div(100).mul(seventhDayPercent).toPrecision()
        ),
      },
      fourteenth: {
        percent: formatTokenPrice(fourteenthDayPercent),
        amount: formatTokenPrice(
          Big(amount).div(100).mul(fourteenthDayPercent).toPrecision()
        ),
      },
      thirty: {
        percent: formatTokenPrice(thirtyDayPercent),
        amount: formatTokenPrice(
          Big(amount).div(100).mul(thirtyDayPercent).toPrecision()
        ),
      },
    };
  };

  return {
    totalFiat,
    PNL,
  };
};
