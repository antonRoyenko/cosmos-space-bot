import { Bech32Address } from "@keplr-wallet/cosmos";

export const chainInfo = [
  {
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
  },
  {
    rpc: "https://proxies.sifchain.finance/api/secret-4/rpc",
    rest: "https://proxies.sifchain.finance/api/secret-4/rest",
    chainId: "secret-4",
    chainName: "Secret Network",
    stakeCurrency: {
      coinDenom: "SCRT",
      coinMinimalDenom: "uscrt",
      coinDecimals: 6,
      coinGeckoId: "pool:uscrt",
    },
    walletUrl: "https://wallet.keplr.app/#/secret/stake",
    walletUrlForStaking: "https://wallet.keplr.app/#/secret/stake",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "secret",
      bech32PrefixAccPub: "secretpub",
      bech32PrefixValAddr: "secretvaloper",
      bech32PrefixValPub: "secretvaloperpub",
      bech32PrefixConsAddr: "secretvalcons",
      bech32PrefixConsPub: "secretvalconspub",
    },
    currencies: [
      {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
        coinGeckoId: "pool:uscrt",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
        coinGeckoId: "pool:uscrt",
      },
    ],
    coinType: 118,
    features: ["stargate", "ibc-transfer"],
  },
  {
    rpc: "https://proxies.sifchain.finance/api/juno-1/rpc",
    rest: "https://proxies.sifchain.finance/api/juno-1/rest",
    chainId: "juno-1",
    chainName: "Juno",
    stakeCurrency: {
      coinDenom: "JUNO",
      coinMinimalDenom: "ujuno",
      coinDecimals: 6,
      coinGeckoId: "pool:ujuno",
    },
    walletUrl: "https://wallet.keplr.app/#/juno/stake",
    walletUrlForStaking: "https://stake.fish/en/juno/",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "juno",
      bech32PrefixAccPub: "junopub",
      bech32PrefixValAddr: "junovaloper",
      bech32PrefixValPub: "junovaloperpub",
      bech32PrefixConsAddr: "junovalcons",
      bech32PrefixConsPub: "junovalconspub",
    },
    currencies: [
      {
        coinDenom: "JUNO",
        coinMinimalDenom: "ujuno",
        coinDecimals: 6,
        coinGeckoId: "pool:ujuno",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "JUNO",
        coinMinimalDenom: "ujuno",
        coinDecimals: 6,
        coinGeckoId: "pool:ujuno",
      },
    ],
    coinType: 118,
    features: ["stargate", "ibc-transfer"],
  },
  {
    rpc: "https://proxies.sifchain.finance/api/evmos/rpc",
    rest: "https://proxies.sifchain.finance/api/evmos/rest",
    chainId: "evmos_9001-2",
    chainName: "EVMOS",
    stakeCurrency: {
      coinDenom: "evmos",
      coinMinimalDenom: "aevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
    },
    walletUrl: "https://wallet.keplr.app/#/evmos/stake",
    walletUrlForStaking: "https://wallet.keplr.app/#/evmos/stake",
    bip44: {
      coinType: 60,
    },
    bech32Config: {
      bech32PrefixAccAddr: "evmos",
      bech32PrefixAccPub: "evmospub",
      bech32PrefixValAddr: "evmosvaloper",
      bech32PrefixValPub: "evmosvaloperpub",
      bech32PrefixConsAddr: "evmosvalcons",
      bech32PrefixConsPub: "evmosvalconspub",
    },
    currencies: [
      {
        coinDenom: "evmos",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        coinGeckoId: "evmos",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "evmos",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        coinGeckoId: "evmos",
      },
    ],
    coinType: 60,
    features: ["stargate", "ibc-transfer"],
  },
];
