import { Bech32Address } from "@keplr-wallet/cosmos";

export const stargazeConfig = {
  network: "stars",
  coingeckoId: "stargaze",
  prefix: Bech32Address.defaultBech32Config("stars"),
  primaryTokenUnit: "ustars",
  tokenUnits: {
    ustars: {
      display: "stars",
      exponent: 6,
    },
  },
};
