import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { GraphQLClient, gql } from "graphql-request"
import { Layout } from "../../components/Layout"

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

  const query = gql`
    {
      posts {
        id
        slug
        title
      }
    }
  `
  const { posts } = await graphQLClient.request<{ posts: Post[] }>(query)
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params,
}) => {
  const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

  const query = gql`
    query PostPageQuery($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        body
      }
    }
  `

  const { post } = await graphQLClient.request<{ post: Post }>(query, {
    slug: params.slug,
  })

  return {
    props: {
      post,
    },
  }
}

export default PostPage
