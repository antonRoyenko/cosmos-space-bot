const coingeckoApiHost = "https://api.coingecko.com/api/v3";

export const getTokenPrice = (
  id: string,
  queryParams: { [key: string]: string }
) => {
  const params = new URLSearchParams(queryParams);
  return `${coingeckoApiHost}/simple/token_price/${id}?${params}`;
};

export const getTokenPriceByDate = (
  id: string,
  queryParams: { date: string; localization: string }
) => {
  const params = new URLSearchParams(queryParams);
  return `${coingeckoApiHost}/coins/${id}/history?${params}`;
};
