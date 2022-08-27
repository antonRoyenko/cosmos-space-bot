import { Bech32Address } from "@keplr-wallet/cosmos";

export const crescentConfig = {
  network: "cre",
  coingeckoId: "crescent-network",
  prefix: Bech32Address.defaultBech32Config("cre"),
  primaryTokenUnit: "ucre",
  tokenUnits: {
    ucre: {
      display: "cre",
      exponent: 6,
    },
  },
};
