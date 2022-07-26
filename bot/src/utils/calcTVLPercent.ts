import Big from "big.js";

export const calcTVLPercent = (a: number, b: number) => {
  const x = new Big(a);
  const y = new Big(b);

  return x.minus(y).div(y).mul(100).toPrecision();
};
