import _ from "lodash";
import Big from "big.js";
import {
  fetchAvailableBalances,
  fetchDelegationBalance,
  fetchUnbondingBalance,
  fetchRewards,
} from "./fetchBalance";
import { getDenom, formatToken } from "@bot/utils";
import { BalanceData, ChainInfo } from "@bot/types/general";
import { config } from "@bot/chains";
import { cosmosConfig } from "@bot/chains/cosmos";

export const getBalance = async (
  publicUrl: string,
  address: string,
  prefix: string
) => {
  const chain =
    config.find(({ network }) => network === prefix) || cosmosConfig;
  const promises = [
    fetchAvailableBalances(publicUrl, address),
    fetchDelegationBalance(publicUrl, address),
    fetchUnbondingBalance(publicUrl, address),
    fetchRewards(publicUrl, address),
  ];
  const [available, delegation, unbonding, rewards] = await Promise.allSettled(
    promises
  );

  const formattedRawData: BalanceData = {
    commission: { coins: [] },
    accountBalances: { coins: [] },
    delegationBalance: { coins: [] },
    unbondingBalance: { coins: [] },
    delegationRewards: [],
  };
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

  return formatAllBalance(formattedRawData, chain);
};

const formatAllBalance = (data: BalanceData, chain: ChainInfo) => {
  const { primaryTokenUnit, tokenUnits } = chain;
  const available = getDenom(
    _.get(data, ["accountBalances", "coins"], []),
    primaryTokenUnit
  );
  const availableAmount = formatToken(
    available.amount,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );
  const delegate = getDenom(
    _.get(data, ["delegationBalance", "coins"], []),
    primaryTokenUnit
  );
  const delegateAmount = formatToken(
    delegate.amount,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );

  const unbonding = getDenom(
    _.get(data, ["unbondingBalance", "coins"], []),
    primaryTokenUnit
  );
  const unbondingAmount = formatToken(
    unbonding.amount,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );

  const rewards = data.delegationRewards.reduce((a, b) => {
    const coins = _.get(b, ["coins"], []);
    const dsmCoins = getDenom(coins, primaryTokenUnit);

    return Big(a).plus(dsmCoins.amount).toPrecision();
  }, "0");

  const rewardsAmount = formatToken(
    rewards,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );

  const total = Big(availableAmount.value)
    .plus(delegateAmount.value)
    .plus(unbondingAmount.value)
    .plus(rewardsAmount.value)
    .toFixed(tokenUnits[primaryTokenUnit].exponent);

  return {
    available: availableAmount,
    delegate: delegateAmount,
    unbonding: unbondingAmount,
    reward: rewardsAmount,
    total: {
      value: total,
      displayDenom: availableAmount.displayDenom,
      baseDenom: availableAmount.baseDenom,
      exponent: availableAmount.exponent,
    },
  };
};
