import Big from "big.js";
import {
  fetchTokenHistory,
  fetchTokenPrice as fetchTokenPriceApi,
} from "./tokenPrice";
import _ from "lodash";
import { formatTokenPrice } from "@bot/utils/formatTokenPrice";
import { calcTVLPercent } from "@bot/utils/calcTVLPercent";
import { TokenData } from "@bot/types/general";

export const fetchTokenPrice = async () => {
  const promises = [fetchTokenPriceApi(), fetchTokenHistory()];

  const [tokenPrice, tokenHistory] = await Promise.allSettled(promises);

  const formattedRawData: TokenData = {
    tokenPrice: [],
    tokenHistory: [],
  };
  formattedRawData.tokenPrice = _.get(tokenPrice, ["value", "tokenPrice"], []);
  formattedRawData.tokenHistory = _.get(
    tokenHistory,
    ["value", "tokenPrice"],
    []
  );

  return formatAllTokens(formattedRawData);
};

export const formatAllTokens = (data: TokenData) => {
  const nowPrice = data.tokenPrice[0]?.usd;

  const totalFiat = (total: number) => {
    return `${formatTokenPrice(nowPrice * total)}$`;
  };

  const PNL = (amount: number) => {
    if (
      data.tokenHistory[0].market_data.current_price &&
      data.tokenHistory[1].market_data.current_price &&
      data.tokenHistory[2].market_data.current_price
    ) {
      const firstDayPercent = calcTVLPercent(
        nowPrice,
        data.tokenHistory[0].market_data.current_price.usd
      );
      const seventhDayPercent = calcTVLPercent(
        nowPrice,
        data.tokenHistory[1].market_data.current_price.usd
      );
      const thirtyDayPercent = calcTVLPercent(
        nowPrice,
        data.tokenHistory[2].market_data.current_price.usd
      );

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
        thirty: {
          percent: formatTokenPrice(thirtyDayPercent),
          amount: formatTokenPrice(
            Big(amount).div(100).mul(thirtyDayPercent).toPrecision()
          ),
        },
      };
    }

    return {
      first: { percent: 0, amount: 0 },
      seventh: { percent: 0, amount: 0 },
      thirty: { percent: 0, amount: 0 },
    };
  };

  return {
    totalFiat,
    PNL,
  };
};
