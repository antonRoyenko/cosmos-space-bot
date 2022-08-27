import { Bech32Address } from "@keplr-wallet/cosmos";

export const desmosConfig = {
  network: "desmos",
  coingeckoId: "desmos",
  prefix: Bech32Address.defaultBech32Config("desmos"),
  primaryTokenUnit: "udsm",
  tokenUnits: {
    udsm: {
      display: "dsm",
      exponent: 6,
    },
  },
};
