import { bech32 } from "bech32";

export const addrToValoper = (address: string, prefix: string) => {
  const decode = bech32.decode(address).words;
  return bech32.encode(prefix, decode);
};
