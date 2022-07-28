// import { createRequest } from "@bot/graphql/request";
import { Proposals } from "@bot/graphql/general/proposals";

export const fetchProposal = async () => {
  const defaultReturnValue = {
    proposal: [],
  };
  try {
    return defaultReturnValue;
    // return await createRequest(Proposals);
  } catch (error) {
    return defaultReturnValue;
  }
};
