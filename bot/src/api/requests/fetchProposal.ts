import { ProposalItemResponse } from "@bot/types/general";
import { restRequest } from "@bot/utils";

export const fetchProposals = async (publicUrl: string) => {
  try {
    const req = await restRequest(
      `${publicUrl}cosmos/gov/v1beta1/proposals?pagination.limit=20&pagination.reverse=true`
    );
    const res: { proposals: ProposalItemResponse } = await req.json();

    return res.proposals.map((item) => ({
      proposalId: item?.proposal_id,
      votingStartTime: item?.voting_start_time,
      title: item?.content?.title,
      description: item?.content?.description,
      status: item?.status,
    }));
  } catch (error) {
    return [];
  }
};
