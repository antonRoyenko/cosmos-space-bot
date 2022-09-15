import { Bech32Address } from "@keplr-wallet/cosmos";

export const terraConfig = {
  network: "terra",
  coingeckoId: "terra-luna",
  prefix: Bech32Address.defaultBech32Config("terra"),
  primaryTokenUnit: "uluna",
  tokenUnits: {
    uluna: {
      display: "lunc",
      exponent: 6,
    },
  },
};
