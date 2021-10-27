import { PostData, PostDataSmall } from "./post-data"
import { TagData } from "./tag-data"

export interface IBlogPostRepository {
  getAllPosts(): Promise<PostData[]>
  getAllPostsSmall(): Promise<PostDataSmall[]>
  getPost(slug: string): Promise<PostData>
  getAllTags(): Promise<TagData[]>
}
