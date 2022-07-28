import { request } from "@bot/utils/graphqlRequest";
import { MarketData } from "@bot/graphql/general/market_data";
import { Tokenomics } from "@bot/graphql/general/tokenomics";
import { LatestBlockHeight } from "@bot/graphql/general/block_height";

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
    // const data = await request(MarketData, {
    //   denom: "dsm",
    // });

    return {
      data: defaultReturnValue,
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
    return defaultReturnValue;
    // return await createRequest(LatestBlockHeight);
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
    // const data = await createRequest(Tokenomics);

    return {
      data: defaultReturnValue,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};
