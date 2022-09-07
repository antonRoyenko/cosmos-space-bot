import { Bech32Address } from "@keplr-wallet/cosmos";

export const regenConfig = {
  network: "regen",
  coingeckoId: "regen",
  prefix: Bech32Address.defaultBech32Config("regen"),
  primaryTokenUnit: "uregen",
  tokenUnits: {
    uregen: {
      display: "regen",
      exponent: 6,
    },
  },
};
