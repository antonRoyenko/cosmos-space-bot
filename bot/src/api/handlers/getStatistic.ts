import _ from "lodash";
import {
  fetchCommunityPool,
  fetchDistributionParams,
  fetchInflation,
  fetchPool,
  fetchSupply,
  fetchLatestHeight,
  fetchAnnualProvisions,
  fetchNetworkStatistic,
} from "@bot/api";
import numeral from "numeral";
import { ChainInfo, Coins, StatisticData } from "@bot/types/general";
import { formatToken } from "@bot/utils";
import { getBlocksPerYearReal } from "@bot/utils/getBlocksPerYearReal";
import { calculateRealAPR } from "@bot/utils/calculateApr";

export const getStatistic = async (
  publicUrl: string,
  denom: string,
  chain: ChainInfo,
  tokenUnit: string
) => {
  const promises = [
    fetchCommunityPool(publicUrl),
    fetchInflation(publicUrl, denom),
    fetchSupply(publicUrl, tokenUnit),
    fetchPool(publicUrl),
    fetchDistributionParams(publicUrl),
    fetchLatestHeight(publicUrl),
    fetchAnnualProvisions(publicUrl),
    fetchNetworkStatistic(publicUrl),
    getBlocksPerYearReal(publicUrl),
  ];

  const [
    communityPool,
    inflation,
    supply,
    pool,
    distributionParams,
    latestHeight,
    annualProvisions,
    networkStatistic,
    blocksPerYear,
  ] = await Promise.allSettled(promises);

  const formattedRawData: StatisticData = {
    communityPool: {},
    inflation: {},
    supply: {
      amount: 0,
      denom: "",
    },
    pool: {},
    distributionParams: {},
    height: "",
    annualProvisions: "",
    networkStatistic: {},
    blocksPerYear: 0,
  };

  formattedRawData.communityPool = _.get(
    communityPool,
    ["value", "communityPool"],
    {}
  );
  formattedRawData.inflation = _.get(inflation, ["value", "inflation"], 0);
  formattedRawData.supply = _.get(supply, ["value", "supply"], {});
  formattedRawData.pool = _.get(pool, ["value", "pool"], {});
  formattedRawData.distributionParams = _.get(
    distributionParams,
    ["value", "params"],
    {}
  );
  formattedRawData.height = _.get(
    latestHeight,
    ["value", "height", "last_commit", "height"],
    ""
  );
  formattedRawData.annualProvisions = _.get(
    annualProvisions,
    ["value", "annualProvisions"],
    ""
  );
  formattedRawData.networkStatistic = _.get(
    networkStatistic,
    ["value", "networkStatistic"],
    ""
  );
  formattedRawData.blocksPerYear = _.get(
    blocksPerYear,
    ["value", "blocksPerYear"],
    ""
  );

  return formatStatisticsValues(formattedRawData, chain);
};

const formatStatisticsValues = (data: StatisticData, chain: ChainInfo) => {
  const { primaryTokenUnit, tokenUnits } = chain;
  let communityPool;

  const [communityPoolCoin]: [Coins] = _.get(
    data,
    ["communityPool"],
    []
  ).filter((x: Coins) => x.denom === chain.primaryTokenUnit);

  const inflation = _.get(data, ["inflation"], 0);

  const total = _.get(data, ["supply"], {
    amount: 0,
  });

  const rawSupplyAmount = total.amount;

  const supply = formatToken(
    rawSupplyAmount,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );

  if (communityPoolCoin && communityPoolCoin.denom === chain.primaryTokenUnit) {
    console.log(1, communityPoolCoin.amount);
    communityPool = formatToken(
      communityPoolCoin.amount,
      tokenUnits[communityPoolCoin.denom],
      communityPoolCoin.denom
    );
  }

  const bonded = _.get(data, ["pool", "bonded"], 1);
  const unbonding = _.get(data, ["pool", "notBonded"], 1);
  const unbonded = rawSupplyAmount - unbonding - bonded;

  const communityTax = _.get(
    data,
    ["distributionParams", "community_tax"],
    "0"
  );

  console.log(data.annualProvisions, communityTax);
  const apr = calculateRealAPR({
    annualProvisions: Number(data.annualProvisions),
    communityTax: communityTax,
    bondedTokens: bonded,
    blocksYearReal: data.blocksPerYear,
  });

  return {
    supply,
    inflation,
    communityPool,
    apr: Number(apr),
    height: data.height,
    bonded: numeral(
      formatToken(bonded, tokenUnits[primaryTokenUnit], primaryTokenUnit).value
    ).value(),
    unbonding: numeral(
      formatToken(unbonding, tokenUnits[primaryTokenUnit], primaryTokenUnit)
        .value
    ).value(),
    unbonded: numeral(
      formatToken(unbonded, tokenUnits[primaryTokenUnit], primaryTokenUnit)
        .value
    ).value(),
  };
};
