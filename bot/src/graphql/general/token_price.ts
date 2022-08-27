export const TokenPrice = /* GraphQL */ `
  query TokenPrice($denom: String) {
    tokenPrice: token_price(where: { unit_name: { _eq: $denom } }) {
      id
      price
      timestamp
      marketCap: market_cap
      unitName: unit_name
    }
  }
`;

export const TokenPriceHistory = /* GraphQL */ `
  query TokenPriceHistory($denom: String, $limit: Int = 1, $offset: Int = 0) {
    tokenPrice: token_price_history(
      where: { unit_name: { _eq: $denom } }
      limit: $limit
      order_by: { timestamp: desc }
      offset: $offset
    ) {
      price
      timestamp
    }
  }
`;
