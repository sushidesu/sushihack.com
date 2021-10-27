import { gql, GraphQLClient } from "graphql-request"
import { createGraphQLClient } from "../plugins/graphql"
import { IBlogPostRepository } from "../components/interface/blog-post-repository-interface"
import { PostModel, TagModel } from "./scheme"
import { PostData, PostDataSmall } from "components/interface/post-data"
import { TagData } from "components/interface/tag-data"

export class BlogPostRepository implements IBlogPostRepository {
  private gqlClient: GraphQLClient
  constructor() {
    this.gqlClient = createGraphQLClient()
  }

  async getAllPosts() {
    const query = gql`
      {
        posts {
          id
          slug
          title
          body
          tags {
            id
            label
            slug
          }
        }
      }
    `
    const { posts } = await this.gqlClient.request<{ posts: PostModel[] }>(
      query
    )
    return posts.map((post) => this.convertPost(post))
  }

  async getAllPostsSmall(): Promise<PostDataSmall[]> {
    const query = gql`
      {
        posts {
          id
          slug
          title
        }
      }
    `
    const { posts } = await this.gqlClient.request<{
      posts: Pick<PostModel, "id" | "title" | "slug">[]
    }>(query)
    return posts.map((post) => this.convertSmallPost(post))
  }

  async getAllTags() {
    return []
  }

  private convertPost(model: PostModel): PostData {
    return {
      id: model.id,
      slug: model.slug,
      title: model.title,
      body: model.body,
      tags: model.tags.map((tag) => this.convertTag(tag)),
    }
  }
  private convertSmallPost(
    model: Pick<PostModel, "id" | "title" | "slug">
  ): PostDataSmall {
    return {
      id: model.id,
      slug: model.slug,
      title: model.title,
    }
  }

  private convertTag(model: TagModel): TagData {
    return {
      id: model.id,
      slug: model.slug,
      label: model.label,
    }
  }
}