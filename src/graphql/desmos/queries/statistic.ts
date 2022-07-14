import { desmosRequest } from "@bot/graphql/desmos/desmosRequest";
import { MarketData } from "@bot/graphql/desmos/general/market_data";
import { Tokenomics } from "@bot/graphql/desmos/general/tokenomics";
import { LatestBlockHeight } from "@bot/graphql/desmos/general/block_height";

export const fetchMarketData = async () => {
  const defaultReturnValue = {
    data: {
      communityPool: [],
      inflation: [],
      tokenPrice: [],
      supply: [],
      bondedTokens: [],
      distributionParams: [],
    },
  };
  try {
    const data = await desmosRequest(MarketData, {
      denom: "dsm",
    });

    return {
      data,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchLatestHeight = async () => {
  const defaultReturnValue = {
    height: [],
  };
  try {
    return await desmosRequest(LatestBlockHeight);
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchTokenomics = async () => {
  const defaultReturnValue = {
    data: {
      stakingParams: [],
      stakingPool: [],
      supply: [],
    },
  };
  try {
    const data = await desmosRequest(Tokenomics);

    return {
      data,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};
