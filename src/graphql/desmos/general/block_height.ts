export const LatestBlockHeight = `query LatestBlockHeight($offset: Int = 0) {
  height: block(order_by: {height: desc}, limit: 1, offset: $offset) {
    height
  }
}
`;
