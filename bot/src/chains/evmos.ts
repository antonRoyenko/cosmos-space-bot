import { Bech32Address } from "@keplr-wallet/cosmos";

export const evmosConfig = {
  network: "cosmos",
  coingeckoId: "evmos",
  prefix: Bech32Address.defaultBech32Config("cosmos"),
  primaryTokenUnit: "uatom",
  tokenUnits: {
    uatom: {
      display: "ATOM",
      exponent: 18,
    },
  },
};
