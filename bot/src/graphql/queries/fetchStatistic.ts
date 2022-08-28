import { request } from "@bot/utils";
import { MarketData, EmoneyMarketData } from "@bot/graphql/general/market_data";
import { Tokenomics } from "@bot/graphql/general/tokenomics";
import { LatestBlockHeight } from "@bot/graphql/general/block_height";

export const fetchMarketData = async (publicUrl: string, denom: string) => {
  const defaultReturnValue = {
    statistic: {
      communityPool: [],
      inflation: [],
      tokenPrice: [],
      supply: [],
      bondedTokens: [],
      distributionParams: [],
    },
  };
  try {
    const document = denom === "ngm" ? EmoneyMarketData : MarketData;
    const data = await request(publicUrl, document, {
      denom,
    });

    return {
      statistic: data,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchLatestHeight = async (publicUrl: string) => {
  const defaultReturnValue = {
    height: [],
  };
  try {
    return await request(publicUrl, LatestBlockHeight);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchTokenomics = async (publicUrl: string) => {
  const defaultReturnValue = {
    tokenomics: {
      stakingParams: [],
      stakingPool: [],
      supply: [],
    },
  };
  try {
    const data = await request(publicUrl, Tokenomics);

    return {
      tokenomics: data,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};
