import { gql, GraphQLClient } from "graphql-request"
import { createGraphQLClient } from "../plugins/graphql"
import { IBlogPostRepository } from "../components/interface/blog-post-repository-interface"
import { PostModel, TagModel } from "./scheme"
import { PostData, PostDataSmall } from "components/interface/post-data"
import { TagData, TagDataWithPosts } from "components/interface/tag-data"

export class BlogPostRepository implements IBlogPostRepository {
  private gqlClient: GraphQLClient
  constructor() {
    this.gqlClient = createGraphQLClient()
  }

  async getAllPosts() {
    const query = gql`
      {
        posts(orderBy: published_DESC) {
          id
          published
          slug
          title
          body
          tags {
            id
            label
            slug
          }
          thumbnail_webp: thumbnail {
            url(
              transformation: {
                image: { resize: { fit: scale, height: 200, width: 200 } }
                document: { output: { format: webp } }
              }
            )
          }
          thumbnail_png: thumbnail {
            url(
              transformation: {
                image: { resize: { fit: scale, height: 200, width: 200 } }
                document: { output: { format: png } }
              }
            )
          }
          thumbnail_ogp: thumbnail {
            url(
              transformation: {
                image: { resize: { fit: scale, height: 800, width: 800 } }
                document: { output: { format: png } }
              }
            )
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
        posts(orderBy: published_DESC) {
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

  async getPost(slug: string): Promise<PostData> {
    const query = gql`
      query PostPageQuery($slug: String!) {
        post(where: { slug: $slug }) {
          id
          published
          slug
          title
          body
          tags {
            id
            label
            slug
          }
          thumbnail_webp: thumbnail {
            url(
              transformation: {
                image: { resize: { fit: scale, height: 200, width: 200 } }
                document: { output: { format: webp } }
              }
            )
          }
          thumbnail_png: thumbnail {
            url(
              transformation: {
                image: { resize: { fit: scale, height: 200, width: 200 } }
                document: { output: { format: png } }
              }
            )
          }
          thumbnail_ogp: thumbnail {
            url(
              transformation: {
                image: { resize: { fit: scale, height: 800, width: 800 } }
                document: { output: { format: png } }
              }
            )
          }
        }
      }
    `
    const { post } = await this.gqlClient.request<{ post: PostModel }>(query, {
      slug: slug,
    })

    const connections = gql`
      query ConnectionsQuery($id: String!) {
        next: postsConnection(after: $id, first: 1) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        prev: postsConnection(before: $id, last: 1) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
    const { prev, next } = await this.gqlClient.request<{
      prev: PostConnection
      next: PostConnection
    }>(connections, { id: post.id })
    return this.convertPost(post, prev, next)
  }

  async getAllTags(): Promise<TagData[]> {
    const query = gql`
      {
        tags {
          id
          slug
          label
        }
      }
    `
    const { tags } = await this.gqlClient.request<{ tags: TagModel[] }>(query)
    return tags.map((tag) => this.convertTag(tag))
  }

  async getTagWithPosts(slug: string): Promise<TagDataWithPosts> {
    const query = gql`
      query TagPageQuery($slug: String!) {
        tag(where: { slug: $slug }) {
          id
          label
          slug
          posts {
            id
            title
            slug
          }
        }
      }
    `
    const { tag } = await this.gqlClient.request<{ tag: TagModel }>(query, {
      slug: slug,
    })
    return this.convertTagWithPosts(tag)
  }

  private convertPost(
    model: PostModel,
    prev?: PostConnection,
    next?: PostConnection
  ): PostData {
    return {
      id: model.id,
      publishedAt: model.published,
      slug: model.slug,
      title: model.title,
      body: model.body,
      tags: model.tags.map((tag) => this.convertTag(tag)),
      thumbnail_png: model.thumbnail_png?.url ?? null,
      thumbnail_webp: model.thumbnail_webp?.url ?? null,
      thumbnail_ogp: model.thumbnail_ogp?.url ?? null,
      prevPost: prev?.edges[0]
        ? {
            title: prev.edges[0].node.title,
            slug: prev.edges[0].node.slug,
          }
        : null,
      nextPost: next?.edges[0]
        ? {
            title: next.edges[0].node.title,
            slug: next.edges[0].node.slug,
          }
        : null,
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
  private convertTagWithPosts(model: TagModel): TagDataWithPosts {
    return {
      id: model.id,
      slug: model.slug,
      label: model.label,
      posts: model.posts.map((post) => this.convertSmallPost(post)),
    }
  }
}

type PostConnection = {
  edges: {
    node: {
      id: string
      slug: string
      title: string
    }
  }[]
}
