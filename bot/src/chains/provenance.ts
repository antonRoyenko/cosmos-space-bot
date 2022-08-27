import { Bech32Address } from "@keplr-wallet/cosmos";

export const provenanceConfig = {
  network: "pb",
  coingeckoId: "provenance-blockchain",
  prefix: Bech32Address.defaultBech32Config("pb"),
  primaryTokenUnit: "nhash",
  tokenUnits: {
    nhash: {
      display: "hash",
      exponent: 9,
    },
  },
};
