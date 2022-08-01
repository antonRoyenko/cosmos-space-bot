import Big from "big.js";
import {
  fetchTokenHistory,
  fetchTokenPrice as fetchTokenPriceApi,
} from "./fetchTokenPrice";
import _ from "lodash";
import { formatTokenPrice } from "@bot/utils/formatTokenPrice";
import { calcTVLPercent } from "@bot/utils/calcTVLPercent";
import { TokenData } from "@bot/types/general";
import { config } from "@bot/chains";
import { atomConfig } from "@bot/chains/atom";

export const getTokenPrice = async (prefix: string) => {
  const chain = config.find(({ network }) => network === prefix) || atomConfig;
  const apiId = chain.coingeckoId;

  const promises = [fetchTokenPriceApi(apiId), fetchTokenHistory(apiId)];

  const [tokenPrice, tokenHistory] = await Promise.allSettled(promises);

  const formattedRawData: TokenData = {
    tokenPrice: {},
    tokenHistory: [],
  };
  formattedRawData.tokenPrice = _.get(tokenPrice, ["value", "tokenPrice"], []);
  formattedRawData.tokenHistory = _.get(
    tokenHistory,
    ["value", "tokenPrice"],
    []
  );

  return formatAllTokens(formattedRawData, apiId);
};

export const formatAllTokens = (data: TokenData, apiId: string) => {
  const currentPrice = data.tokenPrice[apiId]?.usd;

  const totalFiat = (total: number) => {
    return `${formatTokenPrice(currentPrice * total)}$`;
  };

  const PNL = (amount: number) => {
    let firstDayPercent = "0";
    if (data.tokenHistory[0]?.market_data?.current_price) {
      firstDayPercent = calcTVLPercent(
        currentPrice,
        data.tokenHistory[0].market_data.current_price.usd
      );
    }

    let seventhDayPercent = "0";
    if (data.tokenHistory[1]?.market_data?.current_price) {
      seventhDayPercent = calcTVLPercent(
        currentPrice,
        data.tokenHistory[1].market_data.current_price.usd
      );
    }

    let fourteenthDayPercent = "0";
    if (data.tokenHistory[2]?.market_data?.current_price) {
      fourteenthDayPercent = calcTVLPercent(
        currentPrice,
        data.tokenHistory[2].market_data.current_price.usd
      );
    }

    let thirtyDayPercent = "0";
    if (data.tokenHistory[3]?.market_data?.current_price) {
      thirtyDayPercent = calcTVLPercent(
        currentPrice,
        data.tokenHistory[3].market_data.current_price.usd
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
    price: currentPrice,
  };
};
