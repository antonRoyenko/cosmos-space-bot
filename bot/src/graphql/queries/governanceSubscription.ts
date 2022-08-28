import dayjs from "dayjs";
import { createSubscriptionObservable } from "@bot/utils";
import { ProposalsSubscriber } from "@bot/graphql/general/proposals";
import gql from "graphql-tag";
import { Subscription } from "@bot/types/general";
import { Context } from "@bot/types";
import _ from "lodash";
import { proposalStatus } from "@bot/constants/proposalStatus";

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
          status === proposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
      );
      const item = activeProposals[0];
      if (!item) {
        return;
      }
      if (!dayjs(item.voting_start_time).isBefore(dayjs(time))) {
        ctx.reply(`${item.title} \n \n` + `${item.description}`);
      }
    },
    (err) => {
      console.log("Err");
      console.log(err);
    }
  );
};
