import { Bech32Address } from "@keplr-wallet/cosmos";

export const akashConfig = {
  network: "akash",
  coingeckoId: "akash-network",
  prefix: Bech32Address.defaultBech32Config("akash"),
  primaryTokenUnit: "uakt",
  tokenUnits: {
    uakt: {
      display: "akt",
      exponent: 6,
    },
  },
};
