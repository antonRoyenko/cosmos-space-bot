import { restRequest } from "@bot/utils";

export const fetchCommunityPool = async (url: string) => {
  const defaultReturnValue = {
    communityPool: [],
  };
  try {
    const req = await restRequest(
      `${url}cosmos/distribution/v1beta1/community_pool`
    );
    const res = await req.text();

    return defaultReturnValue;
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchInflation = async (url: string, denom: string) => {
  const defaultReturnValue = {
    inflation: {},
  };
  try {
    if (denom === "evmos") {
      const req = await restRequest(`${url}evmos/inflation/v1/inflation_rate`);
      const res = await req.json();

      return {
        inflation: Number(res.inflation_rate / 100 || 0),
      };
    }
    const req = await restRequest(`${url}cosmos/mint/v1beta1/inflation`);
    const res = await req.json();

    return {
      inflation: res.inflation,
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchSupply = async (url: string, denom: string) => {
  const defaultReturnValue = {
    supply: {
      amount: {},
    },
  };
  try {
    const req = await restRequest(`${url}cosmos/bank/v1beta1/supply/${denom}`);
    const res = await req.json();

    return {
      supply: res.amount,
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchPool = async (url: string) => {
  const defaultReturnValue = {
    pool: {
      bonded: "",
      notBonded: "",
    },
  };
  try {
    const req = await restRequest(`${url}cosmos/staking/v1beta1/pool`);
    const res = await req.json();

    return {
      pool: {
        bonded: res.pool.bonded_tokens,
        notBonded: res.pool.not_bonded_tokens,
      },
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchDistributionParams = async (url: string) => {
  const defaultReturnValue = {
    params: {},
  };
  try {
    const req = await restRequest(`${url}cosmos/distribution/v1beta1/params`);
    const res = await req.json();

    return {
      params: res.params,
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchLatestHeight = async (publicUrl: string) => {
  const defaultReturnValue = {
    height: "",
  };
  try {
    const req = await restRequest(
      `${publicUrl}cosmos/base/tendermint/v1beta1/blocks/latest`
    );
    const res = await req.json();

    return {
      height: res?.block,
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchBlock = async (publicUrl: string, block: number) => {
  const defaultReturnValue = {
    height: "",
  };
  try {
    const req = await restRequest(
      `${publicUrl}cosmos/base/tendermint/v1beta1/blocks/${block}`
    );
    const res = await req.json();

    return {
      height: res?.block,
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchAnnualProvisions = async (publicUrl: string) => {
  const defaultReturnValue = {
    annualProvisions: "",
  };
  try {
    const req = await restRequest(
      `${publicUrl}cosmos/mint/v1beta1/annual_provisions`
    );
    console.log(123);
    const res = await req.text();
    console.log(124, res);

    return defaultReturnValue;
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};

export const fetchNetworkStatistic = async (publicUrl: string) => {
  const defaultReturnValue = {
    networkStatistic: {},
  };
  try {
    const req = await restRequest(`${publicUrl}cosmos/mint/v1beta1/params`);
    const res = await req.json();

    return {
      networkStatistic: res.params,
    };
  } catch (error) {
    console.log(error);
    return defaultReturnValue;
  }
};
