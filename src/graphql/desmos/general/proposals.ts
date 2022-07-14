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
