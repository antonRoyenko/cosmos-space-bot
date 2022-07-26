import { chainInfo } from "../config";

type ConnectWalletParams = {
  chainId: string;
};

export const connectWallet = async ({
  chainId,
}: ConnectWalletParams): Promise<string | undefined> => {
  if (window.keplr) {
    const config = chainInfo.find((item) => item.chainId === chainId);
    if (config) {
      await window.keplr.experimentalSuggestChain(config);
      await window.keplr.enable(chainId);

      const offlineSigner = window.getOfflineSignerAuto
        ? await window.getOfflineSignerAuto(chainId)
        : undefined;

      const key = await window.keplr.getKey(chainId);

      if (key && key.bech32Address && offlineSigner) {
        return key.bech32Address;
      }
    }
  } else if (!window.keplr) {
    throw new Error(
      "Please install Keplr extension to view your account balance"
    );
  }
};
