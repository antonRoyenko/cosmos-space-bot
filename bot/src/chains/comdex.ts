import { Bech32Address } from "@keplr-wallet/cosmos";

export const comdexConfig = {
  network: "comdex",
  coingeckoId: "comdex",
  prefix: Bech32Address.defaultBech32Config("comdex"),
  primaryTokenUnit: "ucmdx",
  tokenUnits: {
    ucmdx: {
      display: "cmdx",
      exponent: 6,
    },
  },
};
