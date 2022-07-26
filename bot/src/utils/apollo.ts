import { execute } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ws from "ws";

// TODO need migrate problem in graphql-ws (Sec-WebSocket-Accept)
const getWsClient = function () {
  const client = new SubscriptionClient(
    "wss://gql.desmos.forbole.com/v1/graphql",
    {
      reconnect: true,
      lazy: true,
    },
    ws
  );
  return client;
};

export const createSubscriptionObservable = (query: any) => {
  const link = new WebSocketLink(getWsClient());
  return execute(link, { query: query });
};
