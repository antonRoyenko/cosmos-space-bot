import Big from "big.js";
import {
  fetchTokenHistory,
  fetchTokenPrice as fetchTokenPriceApi,
} from "./fetchTokenPrice";
import { formatTokenPrice, calcTVLPercent } from "@bot/utils";
import { CoinHistoryResponse, TTokenPrice } from "@bot/types/general";

export async function getTokenPrice({ apiId }: { apiId: string }): Promise<{
  price: number;
}>;
export async function getTokenPrice({
  isHistoryInclude,
  apiId,
}: {
  isHistoryInclude: boolean;
  apiId: string;
}): Promise<{
  price: number;
  totalFiat: (total: number) => string;
  PNL: any;
}>;
export async function getTokenPrice({
  isHistoryInclude = false,
  apiId,
}: {
  apiId: string;
  isHistoryInclude?: boolean;
}) {
  const price: {
    tokenPrice: TTokenPrice;
  } = await fetchTokenPriceApi(apiId);

  const currentPrice = price.tokenPrice[apiId]?.usd;

  if (!isHistoryInclude) {
    return { price: currentPrice };
  }

  const tokenHistory = await fetchTokenHistory(apiId);

  return {
    price: currentPrice,
    ...formatTokenHistory(tokenHistory.tokenPrice, price.tokenPrice, apiId),
  };
}

export const formatTokenHistory = (
  tokenHistory: Array<CoinHistoryResponse>,
  tokenPrice: TTokenPrice,
  apiId: string
) => {
  const currentPrice = tokenPrice[apiId]?.usd;
  const totalFiat = (total: number) => {
    return `${formatTokenPrice(currentPrice * total)}`;
  };

  const PNL = (amount: number) => {
    const currentPrice = tokenPrice[apiId]?.usd;
    let firstDayPercent = "0";

    if (tokenHistory[0]?.market_data?.current_price) {
      firstDayPercent = calcTVLPercent(
        currentPrice,
        tokenHistory[0].market_data.current_price.usd
      );
    }

    let seventhDayPercent = "0";
    if (tokenHistory[1]?.market_data?.current_price) {
      seventhDayPercent = calcTVLPercent(
        currentPrice,
        tokenHistory[1].market_data.current_price.usd
      );
    }

    let fourteenthDayPercent = "0";
    if (tokenHistory[2]?.market_data?.current_price) {
      fourteenthDayPercent = calcTVLPercent(
        currentPrice,
        tokenHistory[2].market_data.current_price.usd
      );
    }

    let thirtyDayPercent = "0";
    if (tokenHistory[3]?.market_data?.current_price) {
      thirtyDayPercent = calcTVLPercent(
        currentPrice,
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
