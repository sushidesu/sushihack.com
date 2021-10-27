import { GraphQLClient } from "graphql-request"
export { gql } from "graphql-request"

if (!process.env.GRAPHCMS_ENDPOINT) {
  throw new Error("GRAPHCMS_ENDPOINT is not defined")
}

export const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export const createGraphQLClient = (): GraphQLClient => {
  if (!process.env.GRAPHCMS_ENDPOINT) {
    throw new Error("GRAPHCMS_ENDPOINT is not defined")
  }
  return new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)
}
