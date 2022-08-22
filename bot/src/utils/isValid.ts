import { bech32 } from "bech32";

export const isValidAddress = (address: string) => {
  try {
    const decoded = bech32.decode(address).words;
    return !!decoded;
  } catch {
    return false;
  }
};
