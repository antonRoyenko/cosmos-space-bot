import { fetchProposals } from "@bot/graphql/queries/fetchProposal";
import _ from "lodash";
import { proposalStatus } from "@bot/constants/proposalStatus";
import { ProposalsQuery } from "../types/general_types";

export const getProposals = async (url: string) => {
  const promises = [fetchProposals(url)];

  const [proposals] = await Promise.allSettled(promises);

  const formattedRawData: ProposalsQuery = {
    proposals: [],
    total: {},
  };

  formattedRawData.proposals = _.get(proposals, ["value", "proposals"], []);

  return formatProposals(formattedRawData);
};

export const formatProposals = (data: ProposalsQuery) => {
  const { proposals } = data;
  const activeProposals = proposals.filter(
    ({ status }) => status === proposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
  );

  return {
    activeProposals,
    proposals,
  };
};
