import { TokenUnit } from "@bot/types/general";
import Big from "big.js";
import _ from "lodash";

export const formatToken = (
  value: number | string,
  tokenUnits: {
    display: string;
    exponent: number;
  },
  denom: string
): TokenUnit => {
  if (typeof value !== "string" && isNaN(value)) {
    value = "0";
  }

  if (typeof value === "number") {
    value = `${value}`;
  }

  const results: TokenUnit = {
    value,
    displayDenom: denom,
    baseDenom: denom,
    exponent: _.get(tokenUnits, ["exponent"], 0),
  };

  const ratio = 10 ** tokenUnits.exponent;
  results.value = Big(value).div(ratio).toFixed(tokenUnits.exponent);
  results.displayDenom = tokenUnits.display;
  return results;
};
