import { desmosRequest } from "../desmosRequest";
import {
  AccountCommissionDocument,
  AccountBalancesDocument,
  AccountDelegationBalanceDocument,
  AccountUnbondingBalanceDocument,
  AccountDelegationRewardsDocument,
} from "../general/account_details_documents";
import { addrToValoper } from "@bot/utils/generateAllAddress";

export const fetchCommission = async (address: string) => {
  const defaultReturnValue = {
    commission: {
      coins: null,
    },
  };
  try {
    return await desmosRequest(AccountCommissionDocument, {
      validatorAddress: addrToValoper(address, "desmosvaloper"),
    });
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchAvailableBalances = async (address: string) => {
  const defaultReturnValue = {
    accountBalances: {
      coins: [],
    },
  };
  try {
    return await desmosRequest(AccountBalancesDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchDelegationBalance = async (address: string) => {
  const defaultReturnValue = {
    delegationBalance: {
      coins: [],
    },
  };
  try {
    return await desmosRequest(AccountDelegationBalanceDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchUnbondingBalance = async (address: string) => {
  const defaultReturnValue = {
    unbondingBalance: {
      coins: [],
    },
  };
  try {
    return await desmosRequest(AccountUnbondingBalanceDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchRewards = async (address: string) => {
  const defaultReturnValue = {
    delegationRewards: [],
  };
  try {
    return await desmosRequest(AccountDelegationRewardsDocument, {
      address,
    });
  } catch (error) {
    return defaultReturnValue;
  }
};
