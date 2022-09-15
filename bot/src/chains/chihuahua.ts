import { Bech32Address } from "@keplr-wallet/cosmos";

export const chihuahuaConfig = {
  network: "chihuahua",
  coingeckoId: "chihuahua-token",
  prefix: Bech32Address.defaultBech32Config("chihuahua"),
  primaryTokenUnit: "uhuahua",
  tokenUnits: {
    uhuahua: {
      display: "HUAHUA",
      exponent: 6,
    },
  },
};
