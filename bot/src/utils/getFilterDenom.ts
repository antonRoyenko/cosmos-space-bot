import _ from "lodash";

export const getDenom = (
  list: { denom: string; amount: string | number }[] = [],
  denom: string
): {
  denom: string;
  amount: string | number;
} => {
  const [selectedDenom] = list.filter((x) => x.denom === denom);
  let results: {
    denom: string;
    amount: string | number;
  } = {
    denom,
    amount: "0",
  };
  if (!_.isEmpty(selectedDenom)) {
    results = {
      denom: _.get(selectedDenom, ["denom"], ""),
      amount: _.get(selectedDenom, ["amount"], "0"),
    };
  }
  return results;
};
