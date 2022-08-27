import { Bech32Address } from "@keplr-wallet/cosmos";

export const bandConfig = {
  network: "band",
  coingeckoId: "band-protocol",
  prefix: Bech32Address.defaultBech32Config("band"),
  primaryTokenUnit: "uband",
  tokenUnits: {
    uband: {
      display: "band",
      exponent: 6,
    },
  },
};
