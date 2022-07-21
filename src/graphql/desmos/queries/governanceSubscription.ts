import { createSubscriptionObservable } from "@bot/utils/apollo";
import { HeightSubscriber } from "@bot/graphql/desmos/general/proposals";
import gql from "graphql-tag";
import { Subscription } from "@bot/types/general";

export let observer: Subscription;

export const governanceSubscription = function () {
  const subscriptionClient = createSubscriptionObservable(
    gql`
      ${HeightSubscriber}
    `
  );

  observer = subscriptionClient.subscribe(
    (eventData) => {
      // Do something on receipt of the event
      console.log("Received event: ");
      console.log(JSON.stringify(eventData, null, 2));
    },
    (err) => {
      console.log("Err");
      console.log(err);
    }
  );
};
