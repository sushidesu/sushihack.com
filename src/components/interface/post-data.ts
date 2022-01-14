import { TagData } from "./tag-data"

export interface PostData {
  id: string
  slug: string
  title: string
  body: string
  publishedAt: string
  tags: TagData[]
}

export interface PostDataSmall
  extends Pick<PostData, "id" | "slug" | "title"> {}
