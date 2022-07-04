import { toBech32, fromBech32 } from "@cosmjs/encoding";

const generateAllPrefixVariationsForAddress = (
  address: string,
  prefixes: string[]
) => {
  try {
    const decoded = fromBech32(address);
    return prefixes.map((prefix) => toBech32(prefix, decoded.data));
  } catch (e) {
    console.error(e);
    return prefixes.map(
      (prefix) => `${prefix}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
    );
  }
};
