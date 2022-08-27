import { Bech32Address } from "@keplr-wallet/cosmos";

export const likecoinConfig = {
  network: "like",
  coingeckoId: "likecoin",
  prefix: Bech32Address.defaultBech32Config("like"),
  primaryTokenUnit: "nanolike",
  tokenUnits: {
    nanolike: {
      display: "like",
      exponent: 9,
    },
  },
};
