import { Bech32Address } from "@keplr-wallet/cosmos";

export const junoConfig = {
  network: "juno",
  coingeckoId: "juno-network",
  prefix: Bech32Address.defaultBech32Config("juno"),
  primaryTokenUnit: "ujuno",
  tokenUnits: {
    ujuno: {
      display: "juno",
      exponent: 6,
    },
  },
};
