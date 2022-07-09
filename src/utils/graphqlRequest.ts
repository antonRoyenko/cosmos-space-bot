import { gql, GraphQLClient } from "graphql-request";
import { RequestDocument, Variables } from "graphql-request/dist/types";

export const request = <T, V = Variables>(
  url: string,
  document: RequestDocument,
  variables?: V
): Promise<T> =>
  new GraphQLClient(url).request<T, V>(
    gql`
      ${document}
    `,
    variables
  );
