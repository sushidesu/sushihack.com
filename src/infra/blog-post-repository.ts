import { IBlogPostRepository } from "../components/interface/blog-post-repository-interface"

export class BlogPostRepository implements IBlogPostRepository {
  async getAllPosts() {
    return []
  }
  async getAllTags() {
    return []
  }
}
