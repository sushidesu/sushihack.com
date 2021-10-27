import { PostData } from "./post-data"
import { TagData } from "./tag-data"

export interface IBlogPostRepository {
  getAllPosts(): Promise<PostData[]>
  getAllTags(): Promise<TagData[]>
}
