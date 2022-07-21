export const Proposals = `query Proposals ($limit: Int = 7, $offset: Int = 0) {
  proposals: proposal (limit: $limit, offset: $offset, order_by: {id: desc}) {
    title
    proposalId: id
    status
    description
  }
  total: proposal_aggregate {
    aggregate {
      count
    }
  }
}
`;

export const ProposalsSubscriber = `subscription Proposals ($limit: Int = 7, $offset: Int = 0) {
  proposals: proposal (limit: $limit, offset: $offset, order_by: {id: desc}) {
    title
    proposalId: id
    status
    description
  }
  total: proposal_aggregate {
    aggregate {
      count
    }
  }
}
`;

export const HeightSubscriber = `subscription LatestBlockHeightListener($offset: Int = 0) {
  height: block(order_by: {height: desc}, limit: 1, offset: $offset) {
    height
  }
}`;
