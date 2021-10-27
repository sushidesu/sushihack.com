import { PostData, PostDataSmall } from "./post-data"
import { TagData, TagDataWithPosts } from "./tag-data"

export interface IBlogPostRepository {
  getAllPosts(): Promise<PostData[]>
  getAllPostsSmall(): Promise<PostDataSmall[]>
  getPost(slug: string): Promise<PostData>
  getAllTags(): Promise<TagData[]>
  getTagWithPosts(slug: string): Promise<TagDataWithPosts>
}
