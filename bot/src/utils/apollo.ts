import { execute } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ws from "ws";

// TODO need migrate problem in graphql-ws (Sec-WebSocket-Accept)
const getWsClient = function (url: string) {
  const client = new SubscriptionClient(
    url,
    {
      reconnect: true,
      lazy: true,
    },
    ws
  );
  return client;
};

export const createSubscriptionObservable = (query: any, url: string) => {
  const link = new WebSocketLink(getWsClient(url));
  return execute(link, { query: query });
};
