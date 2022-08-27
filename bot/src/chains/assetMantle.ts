import { Bech32Address } from "@keplr-wallet/cosmos";

export const assetmantleConfig = {
  network: "mantle",
  coingeckoId: "assetmantle",
  prefix: Bech32Address.defaultBech32Config("mantle"),
  primaryTokenUnit: "umntl",
  tokenUnits: {
    umntl: {
      display: "mntl",
      exponent: 6,
    },
  },
};
