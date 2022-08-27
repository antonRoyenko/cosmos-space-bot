import { Bech32Address } from "@keplr-wallet/cosmos";

export const agoricConfig = {
  network: "agoric",
  coingeckoId: "agoric",
  prefix: Bech32Address.defaultBech32Config("agoric"),
  primaryTokenUnit: "ubld",
  tokenUnits: {
    ubld: {
      display: "bld",
      exponent: 6,
    },
  },
};
