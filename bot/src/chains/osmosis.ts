import { Bech32Address } from "@keplr-wallet/cosmos";

export const osmoConfig = {
  network: "osmo",
  coingeckoId: "osmosis",
  prefix: Bech32Address.defaultBech32Config("osmo"),
  primaryTokenUnit: "uosmo",
  tokenUnits: {
    uosmo: {
      display: "osmo",
      exponent: 6,
    },
  },
};
