import { TagData } from "./tag-data"

interface PostDataProps {
  id: string
  slug: string
  title: string
  body: string
  tags: TagData[]
}

export class PostData {
  constructor(public readonly props: PostDataProps) {}
}
