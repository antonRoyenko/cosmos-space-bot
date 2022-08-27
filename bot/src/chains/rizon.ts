import { Bech32Address } from "@keplr-wallet/cosmos";

export const rizonConfig = {
  network: "rizon",
  coingeckoId: "rizon",
  prefix: Bech32Address.defaultBech32Config("rizon"),
  primaryTokenUnit: "uatolo",
  tokenUnits: {
    uatolo: {
      display: "atolo",
      exponent: 6,
    },
  },
};
