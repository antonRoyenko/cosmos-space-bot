import { Bech32Address } from "@keplr-wallet/cosmos";

export const secretConfig = {
  network: "secret",
  coingeckoId: "secret",
  prefix: Bech32Address.defaultBech32Config("secret"),
  primaryTokenUnit: "uscrt",
  tokenUnits: {
    uscrt: {
      display: "scrt",
      exponent: 6,
    },
  },
};
