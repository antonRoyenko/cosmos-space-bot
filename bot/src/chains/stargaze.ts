import { Bech32Address } from "@keplr-wallet/cosmos";

export const stargazeConfig = {
  network: "stargaze",
  coingeckoId: "stargaze",
  prefix: Bech32Address.defaultBech32Config("secret"),
  primaryTokenUnit: "ustars",
  tokenUnits: {
    ustars: {
      display: "stars",
      exponent: 6,
    },
  },
};
