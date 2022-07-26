import { desmosRequest } from "@bot/graphql/desmos/desmosRequest";
import { Proposals } from "@bot/graphql/desmos/general/proposals";

export const fetchProposal = async () => {
  const defaultReturnValue = {
    proposal: [],
  };
  try {
    return await desmosRequest(Proposals);
  } catch (error) {
    return defaultReturnValue;
  }
};
