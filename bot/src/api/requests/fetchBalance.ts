import { restRequest } from "@bot/utils";

export const fetchAvailableBalances = async (url: string, address: string) => {
  const defaultReturnValue = {
    accountBalances: {
      coins: [],
    },
  };
  try {
    const req = await restRequest(
      `${url}cosmos/bank/v1beta1/balances/${address}`
    );
    const res = await req.json();

    return {
      accountBalances: {
        coins: res.balances,
      },
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchDelegationBalance = async (url: string, address: string) => {
  const defaultReturnValue = {
    delegationBalance: [],
  };

  try {
    const req = await restRequest(
      `${url}/cosmos/staking/v1beta1/delegations/${address}`
    );
    const res = await req.json();

    return {
      delegationBalance: res.delegation_responses,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchUnbondingBalance = async (url: string, address: string) => {
  const defaultReturnValue = {
    unbondingBalance: {
      coins: [],
    },
  };

  try {
    const req = await restRequest(
      `${url}/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`
    );
    const res = await req.json();

    return {
      unbondingBalance: res.unbonding_responses,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchRewards = async (url: string, address: string) => {
  const defaultReturnValue = {
    delegationRewards: [],
  };
  try {
    const req = await restRequest(
      `${url}/cosmos/distribution/v1beta1/delegators/${address}/rewards`
    );
    const res = await req.json();

    return {
      delegationRewards: res.rewards,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};
