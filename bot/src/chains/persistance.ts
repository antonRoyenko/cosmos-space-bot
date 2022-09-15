import { Bech32Address } from "@keplr-wallet/cosmos";

export const persistanceConfig = {
  network: "persistence",
  coingeckoId: "persistence",
  prefix: Bech32Address.defaultBech32Config("persistence"),
  primaryTokenUnit: "uxprt",
  tokenUnits: {
    uxprt: {
      display: "akt",
      exponent: 6,
    },
  },
};
