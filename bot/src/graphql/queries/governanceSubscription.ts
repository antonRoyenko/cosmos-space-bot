import { createSubscriptionObservable } from "@bot/utils/apollo";
import { ProposalsSubscriber } from "@bot/graphql/general/proposals";
import gql from "graphql-tag";
import { Subscription } from "@bot/types/general";
import { Context } from "@bot/types";
import _ from "lodash";
import { govStatus } from "@bot/constants/gov";

export let observer: Subscription;

export const governanceSubscription = function (
  url: string,
  ctx: Context,
  time: Date
) {
  const subscriptionClient = createSubscriptionObservable(
    gql`
      ${ProposalsSubscriber}
    `,
    url
  );

  observer = subscriptionClient.subscribe(
    (eventData) => {
      const proposals = _.get(eventData, ["data", "proposals"], []);
      const activeProposals = proposals.filter(
        ({ status }: { status: string }) =>
          status === govStatus.PROPOSAL_STATUS_VOTING_PERIOD
      );
      const item = activeProposals[0];
      console.log(item.voting_start_time);
    },
    (err) => {
      console.log("Err");
      console.log(err);
    }
  );
};
