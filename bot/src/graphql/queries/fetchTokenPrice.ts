import { request } from "@bot/utils/graphqlRequest";
import { getTokenPriceByDate } from "@bot/constants/api";
import { getPnlDate } from "@bot/utils/getPnlDate";
import { restRequest } from "@bot/utils/restRequest";
import { TokenPrice } from "@bot/graphql/general/token_price";
import { TTokenPrice } from "@bot/types/general";

export const fetchTokenPrice = async (publicUrl: string, denom: string) => {
  const defaultReturnValue = {
    tokenPrice: [],
  };
  try {
    return await request<{ tokenPrice: Array<TTokenPrice> }>(
      publicUrl,
      TokenPrice,
      {
        denom,
      }
    );
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
