import { Proposals } from "@bot/graphql/general/proposals";
import { request } from "@bot/utils";

export const fetchProposals = async (url: string) => {
  const defaultReturnValue = {
    proposal: [],
  };
  try {
    return await request(url, Proposals);
  } catch (error) {
    return defaultReturnValue;
  }
};
