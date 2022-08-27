import { Bech32Address } from "@keplr-wallet/cosmos";

export const cheqdConfig = {
  network: "cheqd",
  coingeckoId: "cheqd-network",
  prefix: Bech32Address.defaultBech32Config("cheqd"),
  primaryTokenUnit: "ncheq",
  tokenUnits: {
    ncheq: {
      display: "cheq",
      exponent: 9,
    },
  },
};
