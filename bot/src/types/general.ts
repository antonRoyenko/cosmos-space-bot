import { Bech32Config } from "@keplr-wallet/types";

export type TokenUnit = {
  displayDenom: string;
  baseDenom: string;
  exponent: number;
  value: string;
};

export type Coins = {
  amount: string;
  denom: string;
};

export type BalanceData = {
  accountBalances: { coins: Array<Coins> };
  delegationBalance: [];
  unbondingBalance: [];
  delegationRewards: Array<{ coins: Array<Coins>; validatorAddress: string }>;
};

export type ChainInfo = {
  network: string;
  prefix: Bech32Config;
  primaryTokenUnit: string;
  coingeckoId: string;
  tokenUnits: {
    [key: string]: {
      display: string;
      exponent: number;
    };
  };
};

export type StatisticData = {
  communityPool: any;
  supply: {
    amount: number;
    denom: string;
  };
  pool: any;
  distributionParams: any;
  inflation: any;
  height: "";
  annualProvisions: "";
  networkStatistic: any;
  blocksPerYear: 0;
};

export type TTokenPrice = {
  [key: string]: {
    usd: number;
  };
};

export type TokenData = {
  tokenPrice: Array<TTokenPrice>;
  tokenHistory: Array<CoinHistoryResponse>;
};

export interface BasicCoin {
  id?: string;
  name?: string;
  symbol?: string;
}

export interface Image {
  thumb?: string;
  small?: string;
  large?: string;
}

export interface MarketData {
  current_price?: { [key: string]: number };
  total_value_locked?: null;
  mcap_to_tvl_ratio?: null;
  fdv_to_tvl_ratio?: null;
  roi?: null;
  ath?: { [key: string]: number };
  ath_change_percentage?: { [key: string]: number };
  ath_date?: { [key: string]: Date };
  atl?: { [key: string]: number };
  atl_change_percentage?: { [key: string]: number };
  atl_date?: { [key: string]: Date };
  market_cap?: { [key: string]: number };
  market_cap_rank?: number;
  fully_diluted_valuation?: any;
  total_volume?: { [key: string]: number };
  high_24h?: { [key: string]: number };
  low_24h?: { [key: string]: number };
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d?: number;
  price_change_percentage_14d?: number;
  price_change_percentage_30d?: number;
  price_change_percentage_60d?: number;
  price_change_percentage_200d?: number;
  price_change_percentage_1y?: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: number;
  price_change_24h_in_currency?: { [key: string]: number };
  price_change_percentage_1h_in_currency?: { [key: string]: number };
  price_change_percentage_24h_in_currency?: { [key: string]: number };
  price_change_percentage_7d_in_currency?: { [key: string]: number };
  price_change_percentage_14d_in_currency?: { [key: string]: number };
  price_change_percentage_30d_in_currency?: { [key: string]: number };
  price_change_percentage_60d_in_currency?: { [key: string]: number };
  price_change_percentage_200d_in_currency?: { [key: string]: number };
  price_change_percentage_1y_in_currency?: { [key: string]: number };
  market_cap_change_24h_in_currency?: { [key: string]: number };
  market_cap_change_percentage_24h_in_currency?: { [key: string]: number };
  total_supply?: number;
  max_supply?: null;
  circulating_supply?: number;
  last_updated?: Date;
}

export interface CommunityData {
  facebook_likes?: null;
  twitter_followers?: number;
  reddit_average_posts_48h?: number;
  reddit_average_comments_48h?: number;
  reddit_subscribers?: number;
  reddit_accounts_active_48h?: number;
  telegram_channel_user_count?: number;
}

export interface CodeAdditionsDeletions4_Weeks {
  additions?: number;
  deletions?: number;
}

export interface DeveloperData {
  forks?: number;
  stars?: number;
  subscribers?: number;
  total_issues?: number;
  closed_issues?: number;
  pull_requests_merged?: number;
  pull_request_contributors?: number;
  code_additions_deletions_4_weeks?: CodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks?: number;
  last_4_weeks_commit_activity_series?: number[];
}

export interface PublicInterestStats {
  alexa_rank?: number;
  bing_matches?: null;
}

export interface CoinHistoryResponse extends BasicCoin {
  image: Image;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: PublicInterestStats;
}

export type ProposalItem = {
  proposalId: number;
  votingStartTime: string;
  title: string;
  description: string;
  status: string;
};

export type ProposalItemResponse = Array<{
  proposal_id: number;
  voting_start_time: string;
  content: {
    title: string;
    description: string;
  };
  status: string;
}>;

export type Cw20 = Array<{
  symbol: string;
  decimal: number;
  balance: number;
}>;

export type Steps =
  | "wallet"
  | "admin"
  | "governance"
  | "timezone"
  | "notification"
  | "bulkImport"
  | "walletPassword";
