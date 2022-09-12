import { bech32 } from "bech32";
import { config } from "@bot/chains";
import { Wallet } from "@prisma/client";

export const validation = {
  isValidAddress: (address: string) => {
    try {
      const decoded = bech32.decode(address).words;
      return !!decoded;
    } catch {
      return false;
    }
  },
  isValidChain: (address: string) => {
    const prefix = bech32.decode(address).prefix;
    return config.some(({ network }) => {
      return network === prefix;
    });
  },
  isDuplicateAddress: (userWallets: Wallet[], address: string) => {
    return userWallets.some((wallet) => wallet.address === address);
  },
};
