import { getPnlDate, restRequest } from "@bot/utils";
import { getTokenPriceByDate, getTokenPrice } from "@bot/constants/api";

export const fetchTokenPrice = async (apiId: string) => {
  const defaultReturnValue = {
    tokenPrice: {},
  };
  try {
    const response = await restRequest(
      getTokenPrice({
        ids: apiId,
        vs_currencies: "usd",
      })
    );

    const data = await response.json();

    return {
      tokenPrice: data,
    };
  } catch (error) {
    return defaultReturnValue;
  }
};

export const fetchTokenHistory = async (apiId: string) => {
  const defaultReturnValue = {
    tokenPrice: [],
  };
  try {
    const dates = getPnlDate();
    const promises = dates.map(async (date) => {
      const response = await restRequest(
        getTokenPriceByDate(apiId, {
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
