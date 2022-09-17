import _ from "lodash";
import Big from "big.js";
import {
  fetchAvailableBalances,
  fetchDelegationBalance,
  fetchUnbondingBalance,
  fetchRewards,
} from "@bot/api";
import { getDenom, formatToken } from "@bot/utils";
import { BalanceData, ChainInfo, Cw20 } from "@bot/types/general";
import { config } from "@bot/chains";
import { cosmosConfig } from "@bot/chains/cosmos";
import { getCW20tokens } from "@bot/utils/getCW20tokens";
import { junoCW20 } from "@bot/chains/junoCW20";

export const getBalance = async (
  publicUrl: string,
  address: string,
  prefix: string
) => {
  const chain =
    config.find(({ network }) => network === prefix) || cosmosConfig;
  const cw20tokens: Cw20 = [];

  const promises = [
    fetchAvailableBalances(publicUrl, address),
    fetchDelegationBalance(publicUrl, address),
    fetchUnbondingBalance(publicUrl, address),
    fetchRewards(publicUrl, address),
  ];
  const [available, delegation, unbonding, rewards] = await Promise.allSettled(
    promises
  );

  if (prefix === "juno") {
    await Promise.all(
      junoCW20.map(async (token) => {
        const balance: number = await getCW20tokens(
          token.contract_address,
          address
        );
        cw20tokens.push({
          symbol: token.symbol,
          decimal: token.decimal || 0,
          balance: Number(balance),
        });
      })
    );
  }

  const formattedRawData: BalanceData = {
    accountBalances: { coins: [] },
    delegationBalance: [],
    unbondingBalance: [],
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

  return formatAllBalance(formattedRawData, chain, cw20tokens);
};

const formatAllBalance = (
  data: BalanceData,
  chain: ChainInfo,
  cw20tokens: Cw20
) => {
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

  const delegate = data.delegationBalance.reduce((a, b) => {
    const coins = _.get(b, ["balance"], { amount: 0 });

    return Big(a).plus(coins.amount).toPrecision();
  }, "0");
  const delegateAmount = formatToken(
    delegate,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );

  let unbonding = 0;

  if (data.unbondingBalance.length > 0) {
    data.unbondingBalance.forEach(
      (item: { entries: Array<{ balance: string }> }) => {
        if (item?.entries.length) {
          item?.entries.forEach(({ balance }) => {
            unbonding += Number(balance);
          });
        }
      }
    );
  }

  const unbondingAmount = formatToken(
    unbonding,
    tokenUnits[primaryTokenUnit],
    primaryTokenUnit
  );

  const rewards = data.delegationRewards.reduce((a, b) => {
    const coins = _.get(b, ["reward"], []);
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

  const cw20 = cw20tokens
    .filter((item) => Number(item.balance) > 0)
    .map((item) =>
      formatToken(
        item.balance,
        { exponent: item.decimal, display: item.symbol },
        item.symbol
      )
    );

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
    cw20tokens: cw20,
  };
};
