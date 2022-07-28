import _ from "lodash";
import {
  fetchMarketData,
  fetchLatestHeight,
  fetchTokenomics,
} from "./fetchStatistic";
import Big from "big.js";
import numeral from "numeral";
import { Coins, StatisticData, StatisticValues } from "@bot/types/general";
// import { desmosChain } from "@bot/chains/desmos";
import { formatToken } from "@bot/utils/formatToken";
import { getDenom } from "@bot/utils/getFilterDenom";

export const getStatistic = async () => {
  const promises = [fetchMarketData(), fetchLatestHeight(), fetchTokenomics()];

  const [marketData, latestHeight, tokenomics] = await Promise.allSettled(
    promises
  );

  const formattedRawData: StatisticData = {
    statistic: {
      communityPool: [],
      inflation: [],
      tokenPrice: [],
      supply: [],
      bondedTokens: [],
      distributionParams: [],
    },
    height: [],
    tokenomics: {
      stakingParams: [],
      stakingPool: [],
      supply: [],
    },
  };

  formattedRawData.statistic = _.get(marketData, ["value", "statistic"], []);
  formattedRawData.height = _.get(latestHeight, ["value", "height"], []);
  formattedRawData.tokenomics = _.get(tokenomics, ["value", "tokenomics"], []);

  return formatStatisticsValues(formattedRawData);
};

const formatStatisticsValues = (data: StatisticData) => {
  const { statistic, height, tokenomics } = data;
  let communityPool, price, marketCap;

  if (statistic.tokenPrice?.length) {
    price = numeral(
      numeral(statistic?.tokenPrice[0]?.price).format("0.[00]", Math.floor)
    ).value();
    marketCap = statistic.tokenPrice[0]?.marketCap;
  }

  // const [communityPoolCoin]: [Coins] = _.get(
  //   statistic,
  //   ["communityPool", 0, "coins"],
  //   []
  // ).filter((x: Coins) => x.denom === desmosChain.primaryTokenUnit);
  // const inflation = _.get(statistic, ["inflation", 0, "value"], 0);

  // const [total] = _.get(statistic, ["supply", 0, "coins"], []).filter(
  //   (x: Coins) => x.denom === desmosChain.primaryTokenUnit
  // );

  // const rawSupplyAmount = getDenom(
  //   _.get(statistic, ["supply", 0, "coins"], []),
  //   desmosChain.primaryTokenUnit
  // ).amount;
  //
  // const supply = formatToken(
  //   rawSupplyAmount,
  //   desmosChain.tokenUnits.udsm,
  //   desmosChain.primaryTokenUnit
  // );
  //
  // if (communityPoolCoin && communityPoolCoin.denom === "udsm") {
  //   communityPool = formatToken(
  //     communityPoolCoin.amount,
  //     desmosChain.tokenUnits[communityPoolCoin.denom],
  //     communityPoolCoin.denom
  //   );
  // }

  const bondedTokens = _.get(
    statistic,
    ["bondedTokens", 0, "bonded_tokens"],
    1
  );
  const communityTax = _.get(
    statistic,
    ["distributionParams", 0, "params", "community_tax"],
    "0"
  );

  // const inflationWithCommunityTax = Big(1)
  //   .minus(communityTax)
  //   .times(inflation)
  //   .toPrecision(2);
  // const apr = Big(rawSupplyAmount)
  //   .times(inflationWithCommunityTax)
  //   .div(bondedTokens)
  //   .toNumber();
  //
  // const bonded = _.get(tokenomics, ["stakingPool", 0, "bonded"], data);
  //
  // const unbonding = _.get(tokenomics, ["stakingPool", 0, "unbonded"], []);
  //
  // const unbonded = total.amount - unbonding - bonded;

  return {
    // price,
    // supply,
    // marketCap,
    // inflation,
    // communityPool,
    // apr,
    // height,
    // tokenomics,
    // bonded: numeral(
    //   formatToken(
    //     bonded,
    //     desmosChain.tokenUnits.udsm,
    //     desmosChain.primaryTokenUnit
    //   ).value
    // ).value(),
    // unbonding: numeral(
    //   formatToken(
    //     unbonding,
    //     desmosChain.tokenUnits.udsm,
    //     desmosChain.primaryTokenUnit
    //   ).value
    // ).value(),
    // unbonded: numeral(
    //   formatToken(
    //     unbonded,
    //     desmosChain.tokenUnits.udsm,
    //     desmosChain.primaryTokenUnit
    //   ).value
    // ).value(),
  };
};
