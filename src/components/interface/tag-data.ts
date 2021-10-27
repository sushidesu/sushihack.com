import { PostDataSmall } from "./post-data"

export interface TagData {
  id: string
  slug: string
  label: string
}

export interface TagDataWithPosts extends TagData {
  posts: PostDataSmall[]
}
