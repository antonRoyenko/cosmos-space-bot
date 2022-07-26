import { Bech32Address } from "@keplr-wallet/cosmos";

export const keplrConfig = {
  rpc: "https://rpc-cosmoshub.keplr.app",
  rest: "https://lcd-cosmoshub.keplr.app",
  chainId: "cosmoshub-4",
  chainName: "Cosmos Hub",
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
    coinGeckoId: "cosmos",
    coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("cosmos"),
  currencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
      coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
      coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png",
    },
  ],
  coinType: 118,
  features: ["ibc-transfer", "ibc-go"],
  chainSymbolImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png",
  txExplorer: {
    name: "Mintscan",
    txUrl: "https://www.mintscan.io/cosmos/txs/{txHash}",
  },
};
