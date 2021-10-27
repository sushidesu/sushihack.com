import { GraphQLClient } from "graphql-request"

export const createGraphQLClient = (): GraphQLClient => {
  if (!process.env.GRAPHCMS_ENDPOINT) {
    throw new Error("GRAPHCMS_ENDPOINT is not defined")
  }
  return new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)
}
