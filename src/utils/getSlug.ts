import { ParsedUrlQuery } from "querystring"

export const getSlug = (params: ParsedUrlQuery | undefined): string => {
  if (typeof params?.slug !== "string") {
    throw new Error("slug is required")
  }
  return params.slug
}
