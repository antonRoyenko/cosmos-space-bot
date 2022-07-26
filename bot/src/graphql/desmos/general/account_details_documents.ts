export const AccountCommissionDocument = /* GraphQL */ `
  query AccountCommission($validatorAddress: String!) {
    commission: action_validator_commission_amount(address: $validatorAddress) {
      coins
    }
  }
`;

export const AccountBalancesDocument = /* GraphQL */ `
  query AccountBalances($address: String!) {
    accountBalances: action_account_balance(address: $address) {
      coins
    }
  }
`;

export const AccountDelegationBalanceDocument = /* GraphQL */ `
  query AccountDelegationBalance($address: String!) {
    delegationBalance: action_delegation_total(address: $address) {
      coins
    }
  }
`;

export const AccountUnbondingBalanceDocument = /* GraphQL */ `
  query AccountUnbondingBalance($address: String!) {
    unbondingBalance: action_unbonding_delegation_total(address: $address) {
      coins
    }
  }
`;

export const AccountDelegationRewardsDocument = /* GraphQL */ `
  query AccountDelegationRewards($address: String!) {
    delegationRewards: action_delegation_reward(address: $address) {
      validatorAddress: validator_address
      coins
    }
  }
`;
