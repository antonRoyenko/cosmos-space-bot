import { request } from "@bot/utils/graphqlRequest";
import {
  AccountBalancesDocument,
  AccountDelegationBalanceDocument,
  AccountUnbondingBalanceDocument,
  AccountDelegationRewardsDocument,
} from "../general/account_details_documents";

export const fetchAvailableBalances = async (url: string, address: string) => {
  const defaultReturnValue = {
    accountBalances: {
      coins: [],
    },
  };
  try {
    return await request(url, AccountBalancesDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchDelegationBalance = async (url: string, address: string) => {
  const defaultReturnValue = {
    delegationBalance: {
      coins: [],
    },
  };
  try {
    return await request(url, AccountDelegationBalanceDocument, {
      address,
    });
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
    return await request(url, AccountDelegationBalanceDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchRewards = async (url: string, address: string) => {
  const defaultReturnValue = {
    delegationRewards: [],
  };
  try {
    return await request(url, AccountDelegationBalanceDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};
