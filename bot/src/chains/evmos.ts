import { Bech32Address } from "@keplr-wallet/cosmos";

export const evmosConfig = {
  network: "evmos",
  coingeckoId: "evmos",
  prefix: Bech32Address.defaultBech32Config("evmos"),
  primaryTokenUnit: "aevmos",
  tokenUnits: {
    aevmos: {
      display: "evmos",
      exponent: 18,
    },
  },
};
