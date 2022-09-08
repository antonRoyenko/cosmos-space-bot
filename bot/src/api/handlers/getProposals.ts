import { fetchProposals } from "@bot/api";
import { proposalStatus } from "@bot/constants/proposalStatus";
import { ProposalItem } from "@bot/types/general";

export const getProposals = async (url: string) => {
  const proposals = await fetchProposals(url);

  return formatProposals(proposals);
};

export const formatProposals = (proposals: Array<ProposalItem>) => {
  const activeProposals = proposals.filter(
    ({ status }) => status === proposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
  );

  return {
    activeProposals,
    proposals,
  };
};
