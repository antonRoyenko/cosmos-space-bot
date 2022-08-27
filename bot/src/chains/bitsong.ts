import { Bech32Address } from "@keplr-wallet/cosmos";

export const bitsongConfig = {
  network: "bitsong",
  coingeckoId: "bitsong",
  prefix: Bech32Address.defaultBech32Config("bitsong"),
  primaryTokenUnit: "ubtsg",
  tokenUnits: {
    ubtsg: {
      display: "btsg",
      exponent: 6,
    },
  },
};
