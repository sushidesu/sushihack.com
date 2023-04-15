import { TagData } from "./tag-data"

export interface PostData {
  id: string
  slug: string
  title: string
  body: string
  publishedAt: string
  tags: TagData[]
  thumbnail_webp: string | null
  thumbnail_png: string | null
  thumbnail_ogp: string | null
  nextPost: {
    title: string
    slug: string
  } | null
  prevPost: {
    title: string
    slug: string
  } | null
}

export interface PostDataSmall
  extends Pick<PostData, "id" | "slug" | "title"> {}
