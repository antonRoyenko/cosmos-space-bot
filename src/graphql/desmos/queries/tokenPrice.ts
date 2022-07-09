import { getTokenPrice, getTokenPriceByDate } from "@bot/constants/api";
import { desmosChain } from "@bot/configs/desmos";
import { getPnlDate } from "@bot/utils/getPnlDate";
import { restRequest } from "@bot/utils/restRequest";

export const fetchTokenPrice = async () => {
  const defaultReturnValue = {
    tokenPrice: [],
  };
  try {
    const response = await restRequest(
      getTokenPrice("cosmos", {
        contract_addresses: desmosChain.contract,
        vs_currencies: "usd",
      })
    );
    const data = await response.json();

    return {
      tokenPrice: Object.values(data),
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchTokenHistory = async () => {
  const defaultReturnValue = {
    tokenPrice: {},
  };
  try {
    const dates = getPnlDate();
    const promises = dates.map(async (date) => {
      const response = await restRequest(
        getTokenPriceByDate("desmos", {
          date,
          localization: "false",
        })
      );

      return await response.json();
    });
    const data = await Promise.all(promises);
    return {
      tokenPrice: Object.values(data),
    };
  } catch (error) {
    return defaultReturnValue;
  }
};
