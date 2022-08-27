import { Bech32Address } from "@keplr-wallet/cosmos";

export const sifchainConfig = {
  network: "sif",
  coingeckoId: "sifchain",
  prefix: Bech32Address.defaultBech32Config("sif"),
  primaryTokenUnit: "rowan",
  tokenUnits: {
    rowan: {
      display: "erowan",
      exponent: 18,
    },
  },
};
