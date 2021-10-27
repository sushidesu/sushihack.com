import { TagData } from "./tag-data"

export interface PostData {
  id: string
  slug: string
  title: string
  body: string
  tags: TagData[]
}
