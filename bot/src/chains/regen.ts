import { Bech32Address } from "@keplr-wallet/cosmos";

export const regenConfig = {
  network: "regen",
  coingeckoId: "regen",
  prefix: Bech32Address.defaultBech32Config("regen"),
  primaryTokenUnit: "regen",
  tokenUnits: {
    regen: {
      display: "regen",
      exponent: 6,
    },
  },
};
