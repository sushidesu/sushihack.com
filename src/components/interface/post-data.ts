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
  nextPost?:
    | {
        title: string
        path: string
      }
    | undefined
  prevPost?:
    | {
        title: string
        path: string
      }
    | undefined
}

export interface PostDataSmall
  extends Pick<PostData, "id" | "slug" | "title"> {}
