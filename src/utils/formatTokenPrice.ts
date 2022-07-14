import numeral from "numeral";

export const formatTokenPrice = (price?: number | string) => {
  if (!price) {
    return price;
  }
  return numeral(numeral(price).format("0.[00]", Math.floor)).value();
};
