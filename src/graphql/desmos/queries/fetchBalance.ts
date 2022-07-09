import _ from "lodash";
import Big from "big.js";
import {
  fetchCommission,
  fetchAvailableBalances,
  fetchDelegationBalance,
  fetchUnbondingBalance,
  fetchRewards,
} from "./accountDetails";
import { getDenom } from "@bot/utils/getFilterDenom";
import { desmosChain } from "@bot/configs/desmos";
import { formatToken } from "@bot/utils/formatToken";
import { BalanceData } from "@bot/types/general";

export const fetchBalance = async (address: string) => {
  const promises = [
    fetchCommission(address),
    fetchAvailableBalances(address),
    fetchDelegationBalance(address),
    fetchUnbondingBalance(address),
    fetchRewards(address),
  ];
  const [commission, available, delegation, unbonding, rewards] =
    await Promise.allSettled(promises);

  const formattedRawData: BalanceData = {
    commission: { coins: [] },
    accountBalances: { coins: [] },
    delegationBalance: { coins: [] },
    unbondingBalance: { coins: [] },
    delegationRewards: [],
  };
  formattedRawData.commission = _.get(commission, ["value", "commission"], []);
  formattedRawData.accountBalances = _.get(
    available,
    ["value", "accountBalances"],
    []
  );
  formattedRawData.delegationBalance = _.get(
    delegation,
    ["value", "delegationBalance"],
    []
  );
  formattedRawData.unbondingBalance = _.get(
    unbonding,
    ["value", "unbondingBalance"],
    []
  );
  formattedRawData.delegationRewards = _.get(
    rewards,
    ["value", "delegationRewards"],
    []
  );

  return formatAllBalance(formattedRawData);
};

const formatAllBalance = (data: BalanceData) => {
  const available = getDenom(
    _.get(data, ["accountBalances", "coins"], []),
    desmosChain.primaryTokenUnit
  );
  const availableAmount = formatToken(
    available.amount,
    desmosChain.tokenUnits.udsm,
    desmosChain.primaryTokenUnit
  );
  const delegate = getDenom(
    _.get(data, ["delegationBalance", "coins"], []),
    desmosChain.primaryTokenUnit
  );
  const delegateAmount = formatToken(
    delegate.amount,
    desmosChain.tokenUnits.udsm,
    desmosChain.primaryTokenUnit
  );

  const unbonding = getDenom(
    _.get(data, ["unbondingBalance", "coins"], []),
    desmosChain.primaryTokenUnit
  );
  const unbondingAmount = formatToken(
    unbonding.amount,
    desmosChain.tokenUnits.udsm,
    desmosChain.primaryTokenUnit
  );

  const rewards = data.delegationRewards.reduce((a, b) => {
    const coins = _.get(b, ["coins"], []);
    const dsmCoins = getDenom(coins, desmosChain.primaryTokenUnit);

    return Big(a).plus(dsmCoins.amount).toPrecision();
  }, "0");
  const rewardsAmount = formatToken(
    rewards,
    desmosChain.tokenUnits.udsm,
    desmosChain.primaryTokenUnit
  );

  const commission = getDenom(
    _.get(data, ["commission", "coins"], []),
    desmosChain.primaryTokenUnit
  );
  const commissionAmount = formatToken(
    commission.amount,
    desmosChain.tokenUnits.udsm,
    desmosChain.primaryTokenUnit
  );

  const total = Big(availableAmount.value)
    .plus(delegateAmount.value)
    .plus(unbondingAmount.value)
    .plus(rewardsAmount.value)
    .plus(commissionAmount.value)
    .toFixed(desmosChain.tokenUnits.udsm.exponent);

  return {
    available: availableAmount,
    delegate: delegateAmount,
    unbonding: unbondingAmount,
    reward: rewardsAmount,
    commission: commissionAmount,
    total: {
      value: total,
      displayDenom: availableAmount.displayDenom,
      baseDenom: availableAmount.baseDenom,
      exponent: availableAmount.exponent,
    },
  };
};
