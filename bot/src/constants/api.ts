const coingeckoApiHost = "https://api.coingecko.com/api/v3";

export const getTokenPrice = (queryParams: { [key: string]: string }) => {
  const params = new URLSearchParams(queryParams);
  return `${coingeckoApiHost}/simple/price?${params}`;
};

export const getTokenPriceByDate = (
  id: string,
  queryParams: { date: string; localization: string }
) => {
  const params = new URLSearchParams(queryParams);
  return `${coingeckoApiHost}/coins/${id}/history?${params}`;
};
