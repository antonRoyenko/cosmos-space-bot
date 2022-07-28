import { Bech32Address } from "@keplr-wallet/cosmos";

export const desmosConfig = {
  network: "desmos",
  coingeckoId: "desmos",
  prefix: Bech32Address.defaultBech32Config("desmos"),
  primaryTokenUnit: "udsm",
  tokenUnits: {
    udsm: {
      display: "dsm",
      exponent: 6,
    },
  },
  contract:
    "ibc/EA4C0A9F72E2CEDF10D0E7A9A6A22954DB3444910DB5BE980DF59B05A46DAD1C",
};
