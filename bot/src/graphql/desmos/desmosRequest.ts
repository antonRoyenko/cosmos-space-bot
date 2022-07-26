import { request } from "@bot/utils/graphqlRequest";
import { config } from "@bot/config";
import { RequestDocument, Variables } from "graphql-request/dist/types";

export const desmosRequest = <T, V = Variables>(
  document: RequestDocument,
  variables?: V
): Promise<T> => request(config.DESMOS_PUBLIC_GRAPHQL_URL, document, variables);
