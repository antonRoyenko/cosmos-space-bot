import { Bech32Address } from "@keplr-wallet/cosmos";

export const atomConfig = {
  network: "cosmos",
  coingeckoId: "cosmos",
  prefix: Bech32Address.defaultBech32Config("cosmos"),
  primaryTokenUnit: "uatom",
  tokenUnits: {
    uatom: {
      display: "atom",
      exponent: 6,
    },
  },
};
