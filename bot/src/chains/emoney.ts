import { Bech32Address } from "@keplr-wallet/cosmos";

export const emoneyConfig = {
  network: "emoney",
  coingeckoId: "e-money",
  prefix: Bech32Address.defaultBech32Config("emoney"),
  primaryTokenUnit: "ungm",
  tokenUnits: {
    ungm: {
      display: "ngm",
      exponent: 6,
    },
  },
};
